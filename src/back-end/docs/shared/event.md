# Event

O módulo `shared/event` é o núcleo da arquitetura orientada a eventos da aplicação. Ele fornece a estrutura necessária para que diferentes módulos possam se comunicar de forma, eliminando o acoplamento direto e permitindo que o sistema seja mais escalável e fácil de manter.

---

## Componentes Principais

Este módulo é composto por três classes/interfaces que definem o comportamento do seu sistema de eventos.

``Event`` (Classe Abstrata)

Esta é a classe base para todos os eventos de domínio. Ela garante que cada evento tenha uma identificação única, um requisito fundamental para que o Event Bus possa roteá-lo corretamente.

- **Finalidade**: Padronizar a criação de eventos e garantir que eles possuam um ID consistente.

- **Como usar**: Cada novo evento deve estender esta classe, definir seu ID estático e implementar o método getID().

code:
```ts
export abstract class Event {
  public static ID: string;

  public abstract getID(): string;
}
```

---
``EventHandler<T extends Event>`` (Interface)

O contrato para qualquer classe que queira reagir a um evento. Ele define as regras que um manipulador de eventos deve seguir.

- Finalidade: Garantir que todos os manipuladores de eventos tenham um método ``handle`` para processar o evento e um método ``getEventId`` para que o ``EventListener`` possa identificá-los.

- Como usar: As classes que processam a lógica de negócio (as "reações") devem implementar esta interface.

```ts
export interface EventHandler<T extends Event> {
  handle(event: T): Promise<void>;
  getEventId(): string;
}
```

---

``EventListener`` (Event Bus)

O "motor" do sistema. Classe estática que funciona como um singleton e atua como o Event Bus central.

- **Finalidade**: Gerenciar a inscrição de manipuladores (``EventHandler``) e rotear os eventos publicados para os manipuladores corretos.

- **Como usar**:
  - ``EventListener.subscribeHandler()``: Usado para registrar um manipulador para um tipo de evento específico.

  - ``EventListener.publish()``: Usado para disparar um evento para todos os manipuladores inscritos.

---

## Como usar

Para estender seu sistema e criar novos eventos, siga os passos a seguir, é um evento real do sistema.

**Passo 1: Crie um Novo Evento**

Crie um arquito em `@shared/event/[nome_do_evento]` e adicione uma nova classe de evento que estenda a classe base ``Event``.

```ts
import { Event } from "@shared/event/EventListener";

export class UserCreatedEvent extends Event {
  static {
    this.ID = "CREATED_USER"; // Inicialize o ID
  }

  // Dados do evento
  constructor(
    public readonly userId: string,
    public readonly userName: string,
    public readonly userEmail: string
  ) {
    super();
  }

  public getID(): string {
    return UserCreatedEvent.ID;
  }
}
```
**Passo 2: Crie um Novo Handler (Reação)**

Crie uma classe que implemente a interface ``EventHandler<T>``. No caso do evento `UserCreatedEvent`, o modulo de email vai enviar um email default de boas vindas.

```ts
// @email/handler/EmailUserCreatedHandler.ts

// obs: Alguns dados foram removidos para melhor visualização do evento.
import { IEmailService } from "@email/service/IEmailService";
import { EventHandler, EventListener } from "@shared/event/EventListener";
import { UserCreatedEvent } from "@shared/event/UserCreatedEvent";

export class EmailUserCreatedHandler implements EventHandler<UserCreatedEvent> {
  constructor(
    private emailService: IEmailService
  ) {
    EventListener.subscribeHandler(this); // Adicionar ao EventListener
    console.log("[EmailUserCreatedHandler] foi criado\n");
  }

  async handle(event: UserCreatedEvent): Promise<void> {
    const response = await this.emailService.sendMail({
      // Dados do email
    });

    if (!response)
      console.log("Não foi possivel enviar email de boas vindas.\n");
  }

  getEventId(): string {
    return UserCreatedEvent.ID;
  }
}
```

---
**Passo 3: Publique o Evento**

Em um serviço de aplicação, publique o evento após a lógica de negócio principal.

```ts
// @email/service/UserService.ts

// obs: Alguns dados foram removidos para melhor visualização do evento.
import { IUserRepository } from "@user/domain/entities/IUserRepository";
import { UserCreatedEvent } from "@shared/event/UserCreatedEvent";
import { EventListener } from "@shared/event/EventListener";

export class UserService implements IUserService {
  constructor(
    private userRepository: IUserRepository
  ) {}

  async create(userDto: CreateUserDTO): Promise<void> {
    // ... lógica e validações

    const user = await this.userRepository.create(userDomain);

    if (!user)
      throw new InternalServerError("Não foi possivel salver o usuario");

    // emição do evento
    const event = new UserCreatedEvent(
      user.id,
      user.name,
      user.email.getValue()
    );
    await EventListener.publish(event);
    console.log("Portfolio criado com sucesso");
  }
}
```