import React from 'react';
import { Link } from 'react-router-dom';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import HomeIcon from '@material-ui/icons/Home';
import AddIcon from '@material-ui/icons/Add';
import InfoIcon from '@material-ui/icons/Info';

import { styled } from '@material-ui/core/styles';

const BottomNav = styled(BottomNavigation)({
  position: "fixed",
  bottom: 0,
  left: 0,
  right: 0,
  maxWidth: "552px",
  marginLeft: "auto",
  marginRight: "auto",
});

export function BottomNavi() {
  const [value, setValue] = React.useState(0);
  return (
    <BottomNav
      value={value}
      onChange={(event, newValue) => {
        setValue(newValue);
      }}
      showLabels
    >
      <BottomNavigationAction component={Link} to="/" label="ホーム" icon={<HomeIcon />} />
      <BottomNavigationAction component={Link} to="/post" label="投稿" icon={<AddIcon />} />
      <BottomNavigationAction component={Link} to="/about" label="概要" icon={<InfoIcon />} />
    </BottomNav>
  );
}
