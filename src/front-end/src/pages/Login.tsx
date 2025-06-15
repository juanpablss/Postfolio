import React from 'react';

// Componente que injeta os estilos CSS na página
const PageStyles = () => (
  <style>
    {`
      :root {
        --cor-principal-fundo: #2a0845;
        --cor-secundaria-fundo: #6441a5;
        --fundo-vidro: rgba(255, 255, 255, 0.1);
        --borda-vidro: rgba(255, 255, 255, 0.2);
        --sombra-vidro: rgba(0, 0, 0, 0.3);
        --cor-borda-input: #a855f7;
        --cor-link: #7dd3fc;
        --gradiente-botao: linear-gradient(to right, #3b82f6, #60a5fa);
      }

      @keyframes moveGradient {
        0% { background-position: 0% 50%; }
        50% { background-position: 100% 50%; }
        100% { background-position: 0% 50%; }
      }

      @keyframes fadeInUp {
        from {
          opacity: 0;
          transform: translateY(30px);
        }
        to {
          opacity: 1;
          transform: translateY(0);
        }
      }

      /* Este wrapper simula o 'body' para manter o componente encapsulado */
      .login-page-body-wrapper {
        margin: 0;
        padding: 0;
        height: 100vh;
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-family: 'Segoe UI', sans-serif;
        background: linear-gradient(135deg, var(--cor-principal-fundo), var(--cor-secundaria-fundo), #360033);
        background-size: 200% 200%;
        animation: moveGradient 20s ease infinite;
      }

      .main-container {
        display: flex;
        width: 90%;
        max-width: 1200px;
        height: 600px;
        border-radius: 20px;
        overflow: hidden;
        box-shadow: 0 15px 40px rgba(0, 0, 0, 0.4);
      }

      .left-panel {
        flex: 1;
        background-color: var(--cor-principal-fundo);
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        color: white;
        animation: fadeInUp 0.8s ease-out;
      }

      .right-panel {
        flex: 1;
        background: var(--fundo-vidro);
        backdrop-filter: blur(15px);
        -webkit-backdrop-filter: blur(15px);
        border: 1px solid var(--borda-vidro);
        box-shadow: 0 8px 32px 0 var(--sombra-vidro);
        padding: 50px 40px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        color: white;
        animation: fadeInUp 0.8s ease-out 0.2s;
        animation-fill-mode: backwards;
      }

      .dots span {
        height: 14px;
        width: 14px;
        border-radius: 50%;
        display: inline-block;
        margin: 0 5px;
      }
      .left-panel h1 {
        font-size: 60px;
        font-weight: 300;
        font-family: 'Georgia', serif;
        letter-spacing: 4px;
        margin: 20px 0 0 0;
        text-shadow: 0 2px 10px rgba(0, 0, 0, 0.4);
      }

      .right-panel h2 {
        text-align: center;
        font-size: 28px;
        margin-bottom: 40px;
        letter-spacing: 2px;
        font-weight: 600;
        text-shadow: 0 1px 5px rgba(0, 0, 0, 0.4);
      }
      
      .input-group {
        margin-bottom: 25px;
      }
      .input-group label {
        font-size: 14px;
        margin-bottom: 5px;
        display: block;
      }
      
      .input-wrapper {
        position: relative;
      }

      .input-wrapper i {
        position: absolute;
        left: 15px;
        top: 50%;
        transform: translateY(-50%);
        color: rgba(255, 255, 255, 0.5);
        transition: color 0.3s ease;
        pointer-events: none;
      }

      .input-wrapper input {
        width: 100%;
        padding: 12px 15px 12px 45px;
        border-radius: 10px;
        border: 1px solid transparent;
        border-bottom: 1px solid rgba(255, 255, 255, 0.2);
        background: rgba(255, 255, 255, 0.15);
        color: white;
        font-size: 15px;
        outline: none;
        transition: border-color 0.3s ease, background-color 0.3s ease;
        box-sizing: border-box;
      }

      .input-wrapper input:focus {
        background: rgba(255, 255, 255, 0.2);
        border-bottom-color: var(--borda-vidro);
      }
      .input-wrapper input:focus + i {
        color: white;
      }

      .input-wrapper input::placeholder {
          color: rgba(255, 255, 255, 0.7);
      }
      
      .forgot-password-link {
        color: var(--cor-link);
        text-decoration: none;
        font-size: 13px;
        transition: color 0.3s ease;
      }
      .forgot-password-link:hover {
        color: white;
      }

      .remember-me-label {
        font-size: 14px;
        display: flex;
        align-items: center;
        cursor: pointer;
      }
      .remember-me-label input[type="checkbox"] {
        display: none;
      }
      .custom-checkbox {
        width: 18px;
        height: 18px;
        background: rgba(255, 255, 255, 0.1);
        border: 1px solid rgba(255, 255, 255, 0.3);
        border-radius: 4px;
        margin-right: 10px;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        transition: background-color 0.3s ease, border-color 0.3s ease;
      }
      .custom-checkbox i {
        color: white;
        font-size: 12px;
        transform: scale(0);
        transition: transform 0.2s ease-in-out;
      }
      .remember-me-label input:checked + .custom-checkbox {
        background-color: #3b82f6;
        border-color: #3b82f6;
      }
      .remember-me-label input:checked + .custom-checkbox i {
        transform: scale(1);
      }

      .login-button {
        background: var(--gradiente-botao);
        width: 100%;
        padding: 12px;
        border: none;
        border-radius: 10px;
        color: white;
        font-size: 16px;
        font-weight: bold;
        cursor: pointer;
        transition: all 0.3s ease;
        box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
      }
      .login-button:hover {
        transform: translateY(-3px);
        box-shadow: 0 7px 20px rgba(59, 130, 246, 0.4);
        filter: brightness(1.1);
      }
      .login-button:active {
        transform: translateY(-1px);
      }
    `}
  </style>
);


export default function Login() {
  return (
    <>
      <PageStyles />
      <div className="login-page-body-wrapper">
        <div className="main-container">
          <div className="left-panel">
            <div className="dots">
              <span style={{ backgroundColor: '#ff3c91' }}></span>
              <span style={{ backgroundColor: '#9370db' }}></span>
              <span style={{ backgroundColor: '#00cfff' }}></span>
            </div>
            <h1>POSTFOLIO</h1>
          </div>

          <div className="right-panel">
            <h2>Bem-vindo!</h2>

            <form>
              <div className="input-group">
                <label htmlFor="username">Usuário</label>
                <div className="input-wrapper">
                  <input id="username" type="text" placeholder="Insira seu nome de usuário" />
                  <i className="fa-solid fa-user"></i>
                </div>
              </div>

              <div className="input-group">
                <label htmlFor="password">Senha</label>
                <div className="input-wrapper">
                  <input id="password" type="password" placeholder="Insira sua senha" />
                  <i className="fa-solid fa-lock"></i>
                </div>
              </div>

              <div style={{ textAlign: 'right', marginBottom: '25px' }}>
                <a href="#" className="forgot-password-link">Esqueci minha senha</a>
              </div>

              <div style={{ marginBottom: '25px' }}>
                <label className="remember-me-label">
                  <input type="checkbox" />
                  <span className="custom-checkbox"><i className="fa-solid fa-check"></i></span>
                  Lembrar de mim
                </label>
              </div>

              <button type="submit" className="login-button">Entrar</button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}