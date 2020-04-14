import { styled as uiStyled } from '@material-ui/core/styles';
import styled from 'styled-components'

import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';

export const Head1 = styled.h1`
  text-align: center;
  line-height: 2.0;
  font-family: 'Baloo Paaji 2', 'Kosugi Maru', cursive;
`;

export const CenterP = styled.p`
  text-align: center;
`

export const DelBtn = uiStyled(Button)({
  marginTop: "16px",
})

export const FormPaper = uiStyled(Paper)({
  padding: '16px',
})
