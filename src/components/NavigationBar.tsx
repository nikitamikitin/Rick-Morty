import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Drawer, useMediaQuery } from "@mui/material";
const pages = ["Characters", "My watch list"];
import CloseIcon from '@mui/icons-material/Close';
const NavigationBar = () => {
  const [openDrawer, setOpenDrawer] = useState<boolean>(false);
  const history = useNavigate();
  const navigate = useNavigate();

  const isDesktop = useMediaQuery('(max-width: 900px)');
  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setOpenDrawer(true)
  };
  const closeDrawer = () => {
    setOpenDrawer(false)
  };

  const handleCloseNavMenu = (page: string) => {
    switch (page) {
      case "Characters":
        history("/characters");
        
        break;
      case "My watch list":
        history("/watchList");
        break;
    }
    setOpenDrawer(false)
  };
  useEffect(() => {
    setOpenDrawer(false)
  }, [isDesktop]);
  return (
    <AppBar position="static">
      <Drawer
        sx={{width: {xs:'100%',sm:"50%"} , height: {xs:'100%',sm:"50%"}, '& .MuiPaper-root': { height: {xs:'100%',sm:"50%"}}}}
        anchor="top"
        open={openDrawer}
        onClose={()=>closeDrawer()}
      >
        <Box sx={{display:'flex',justifyContent:'space-around',flexDirection:'column',height: "100%"}}>
        <Box sx={{display:'flex',justifyContent:'center',flexDirection:'column',alignItems:'center'}}>
        <Typography
              variant="h6"
              noWrap
              sx={{
                fontFamily: "monospace",
                fontWeight: 500,
                letterSpacing: ".2rem",
                color: "inherit",
                textDecoration: "none",
              }}
            >
              Rick&Morty
            </Typography>
        </Box>
        <Box sx={{display:'flex',justifyContent:'center',flexDirection:'column'}}> 
        {pages.map((item,index)=>(<Button key={index} onClick={()=>handleCloseNavMenu(item)}>{item}</Button>))}
        </Box>
        
          

          <Box sx={{display:'flex',justifyContent:'center',flexDirection:'column'}}>
          <IconButton autoFocus onClick={() => closeDrawer()}>
            <CloseIcon/>
          </IconButton>
          </Box>
          </Box>
       
      </Drawer>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Button
            sx={{ color: "white", display: { xs: "none", md: "block" } }}
            onClick={() => navigate("/characters")}
          >
            <Typography
              variant="h6"
              noWrap
              sx={{
                mr: 2,
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "inherit",
                textDecoration: "none",
              }}
            >
              Rick&Morty
            </Typography>
          </Button>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
          </Box>
          <Button onClick={() => navigate("/characters")}>
            <Typography
              variant="h5"
              noWrap
              sx={{
                mr: 2,
                display: { xs: "flex", md: "none" },
                flexGrow: 1,
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "white",
                textDecoration: "none",
              }}
            >
              Rick&Morty
            </Typography>
          </Button>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" },justifyContent:'end' }}>
            {pages.map((page) => (
              <Button
                key={page}
                onClick={(event) => handleCloseNavMenu(page)}
                sx={{
                  my: 2,
                  color: "white",
                  display: { xs: "none", md: "block" },
                }}
              >
                {page}
              </Button>
            ))}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default NavigationBar;
