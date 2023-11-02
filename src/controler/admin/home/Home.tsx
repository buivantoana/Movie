import { Container } from "@mui/material";
import { HeaderAdmin } from "../header/HeaderAdmin";
import bg from "../../../image/body-background.png";
import { HeaderContainer } from "../header/HeaderContainer";
import { useState } from "react";

export interface IAppProps {}

export function Home(props: IAppProps) {
  let [check, setcheck] = useState(0);
  let [name, setname] = useState("Home");
  function handlemenu(id: number) {
    if (id == 0) {
      setcheck(id);
    } else if (id == 1) {
      setcheck(id);
      setname("Quản lý movie");
    } else if (id == 2) {
      setcheck(id);
      setname("Chi tiết movie");
    } else if (id == 3) {
      setcheck(id);
      setname("Người dùng");
    } else if (id == 4) {
      setcheck(id);
      setname("Profile");
    } else if (id == 5) {
      setcheck(id);
    }
  }
  return (
    <div
      style={{
        display: "flex",
        backgroundImage: `url(${bg})`,
        height: "100vh",
      }}>
      <HeaderAdmin check={check} handlemenu={handlemenu} />

      <Container
        className='adminscroll'
        style={{ padding: "20px", overflowY: "scroll", margin: 0 }}>
        <HeaderContainer name={name} />
        {check === 0 ? (
          <div
            className=''
            style={{ height: "300vh", color: "white", marginTop: "100px" }}>
            home
          </div>
        ) : (
          <div></div>
        )}
        {check === 1 ? (
          <div
            className=''
            style={{ height: "300vh", color: "white", marginTop: "100px" }}>
            Movie
          </div>
        ) : (
          <div></div>
        )}
        {check === 2 ? (
          <div
            className=''
            style={{ height: "300vh", color: "white", marginTop: "100px" }}>
            Detail movie
          </div>
        ) : (
          <div></div>
        )}
        {check === 3 ? (
          <div
            className=''
            style={{ height: "300vh", color: "white", marginTop: "100px" }}>
            Users
          </div>
        ) : (
          <div></div>
        )}
        {check === 4 ? (
          <div
            className=''
            style={{ height: "300vh", color: "white", marginTop: "100px" }}>
            Profile
          </div>
        ) : (
          <div></div>
        )}
      </Container>
    </div>
  );
}
