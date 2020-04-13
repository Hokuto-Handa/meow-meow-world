import { createMuiTheme } from '@material-ui/core/styles';
import { red, yellow  } from '@material-ui/core/colors';

export const theme = createMuiTheme({
  palette: {
    type: 'light',
    primary: red,
    secondary: yellow,
  },
});
