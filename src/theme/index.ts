import { createTheme, ThemeOptions } from '@mui/material/styles';

declare module '@mui/material/styles' {
  interface Theme {
    custom: {
      gradients: { primary: string; secondary: string; soft: string; fiord: string };
      shadows: { alat: { sm: string; md: string; lg: string; xl: string } };
    };
  }
  interface ThemeOptions {
    custom?: {
      gradients?: { primary?: string; secondary?: string; soft?: string; fiord?: string };
      shadows?: { alat?: { sm?: string; md?: string; lg?: string; xl?: string } };
    };
  }
}

const common: ThemeOptions = {
  palette: {
    primary: { main: '#AE328E', light: '#c13a9e', dark: '#8c256d', contrastText: '#ffffff' },
    secondary: { main: '#425563', contrastText: '#ffffff' },
    error: { main: '#dc2626' },
    warning: { main: '#f59e0b' },
    success: { main: '#10b981' },
    info: { main: '#506373' },
  },
  shape: { borderRadius: 12 },
  typography: { fontFamily: 'system-ui, Inter, Arial, sans-serif', fontSize: 14, fontWeightMedium: 500 },
};

export const light = createTheme({
  ...common,
  palette: { ...common.palette, mode: 'light', background: { default: '#ffffff', paper: '#fef9fc' }, text: { primary: '#425563' } },
  custom: {
    gradients: {
      primary: 'linear-gradient(135deg,#AE328E 0%,#c13a9e 50%,#d44fb0 100%)',
      secondary: 'linear-gradient(135deg,#f5e6f1 0%,#f0d7e8 50%,#ebccdf 100%)',
      soft: 'linear-gradient(135deg,#faf7f9 0%,#f9ebf5 50%,#f5e6f1 100%)',
      fiord: 'linear-gradient(135deg,#425563 0%,#506373 50%,#5e7183 100%)',
    },
    shadows: {
      alat: {
        sm: '0 1px 2px 0 rgba(174,50,142,0.15)',
        md: '0 4px 6px -1px rgba(174,50,142,0.15),0 2px 4px -1px rgba(174,50,142,0.06)',
        lg: '0 10px 15px -3px rgba(174,50,142,0.15),0 4px 6px -2px rgba(174,50,142,0.05)',
        xl: '0 20px 25px -5px rgba(174,50,142,0.15),0 10px 10px -5px rgba(174,50,142,0.05)',
      },
    },
  },
});

export const dark = createTheme({
  ...common,
  palette: { 
    ...common.palette, 
    mode: 'dark', 
    background: { default: '#1a1a1a', paper: '#2a2a2a' }, 
    text: { primary: '#ffffff', secondary: '#b0b0b0' },
    primary: { main: '#c13a9e', light: '#d44fb0', dark: '#8c256d', contrastText: '#ffffff' },
  },
  custom: {
    gradients: {
      primary: 'linear-gradient(135deg,#c13a9e 0%,#d44fb0 50%,#e65fc2 100%)',
      secondary: 'linear-gradient(135deg,#2a2a2a 0%,#3a3a3a 50%,#4a4a4a 100%)',
      soft: 'linear-gradient(135deg,#1a1a1a 0%,#2a2a2a 50%,#3a3a3a 100%)',
      fiord: 'linear-gradient(135deg,#506373 0%,#5e7183 50%,#6c7f93 100%)',
    },
    shadows: {
      alat: {
        sm: '0 1px 2px 0 rgba(196,58,158,0.3)',
        md: '0 4px 6px -1px rgba(196,58,158,0.3),0 2px 4px -1px rgba(196,58,158,0.15)',
        lg: '0 10px 15px -3px rgba(196,58,158,0.3),0 4px 6px -2px rgba(196,58,158,0.15)',
        xl: '0 20px 25px -5px rgba(196,58,158,0.3),0 10px 10px -5px rgba(196,58,158,0.15)',
      },
    },
  },
});
