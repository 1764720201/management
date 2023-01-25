import type { Theme } from '@/types/theme'
import styled, { ThemeProps } from 'styled-components'
export const HeaderWrapper = styled.div`
  ${(props: ThemeProps<Theme>) => props.theme.mixin.content_backgroud_color}
  margin-top: 20px;
  padding: 20px;
  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    .title {
      font-size: 22px;
      font-weight: 900;
    }
  }
`
