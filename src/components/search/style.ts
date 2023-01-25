import type { Theme } from '@/types/theme'
import styled from 'styled-components'
import type { ThemeProps } from 'styled-components'
export const SearchWrapper = styled.div`
  ${(props: ThemeProps<Theme>) => props.theme.mixin.content_backgroud_color};
  /* height: 100px; */
`
