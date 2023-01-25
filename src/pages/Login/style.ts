import type { LoginMode } from '@/types/login'
import type { Theme } from '@/types/theme'
import { css, ThemeProps } from 'styled-components'
import styled from 'styled-components'

export const LoginWrapper = styled.div<{ loginMode: LoginMode }>`
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  .login {
    width: 330px;
    h1 {
      text-align: center;
    }
    &-form {
      .login-panel {
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
        border-radius: 5px;
        .login-mode {
          display: flex;
          justify-content: space-between;
          margin-bottom: 20px;
          .account,
          .phone {
            height: 40px;
            width: 50%;
            text-align: center;
            line-height: 40px;
          }
          ${(props) =>
            props.loginMode == '账号登陆'
              ? css`
                  .account {
                    ${(props: ThemeProps<Theme>) =>
                      props.theme.mixin.theme_color}
                  }
                  .phone {
                    background-color: #e3e4e9;
                    border: 1px solid #ccc;
                  }
                `
              : css`
                .phone{
                  ${(props: ThemeProps<Theme>) => props.theme.mixin.theme_color}
                  }
                }
                 .account {
                    background-color: #e3e4e9;
                    border: 1px solid #ccc;
                  }

              `}
        }
        .login-info {
          padding: 20px;
        }
      }
      .login-form-button {
        height: 40px;
        width: 100%;
      }
    }
  }
`
