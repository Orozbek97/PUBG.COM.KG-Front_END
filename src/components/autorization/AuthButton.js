import {Avatar} from "@mui/material";
import {observer} from "mobx-react-lite";
import React, {useContext, useEffect} from 'react';
import {Button, Dropdown} from "react-bootstrap";
import {Link} from "react-router-dom";
import {Context} from "../../index";
import './authorization..css'

const PlayerNameAndAuthButton = () => {
    const { store } = useContext(Context);
    


    useEffect(() => {
        if (localStorage.getItem('token')) {
            store.checkAuth();
        }
    }, []);

    if (store.isLoading) {
      return (
          <div>
            <button className="btn btn-danger text-white">
                <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
            </button>
          </div>
      )
    }

    if (!store.isAuth) {
        return (
            <div>
                <Link to={'/authorization'}  style={{textDecoration: 'none'}}>
                    <Button variant={"primary"} className={'sign-button'}>
                        <i className={`icon ion-android-person`} ></i>
                        Войти
                    </Button>
                </Link>
            </div>
        );
    }

    return (
        <Dropdown className={'d-flex flex-row'}>
            <Dropdown.Toggle id="dropdown-autoclose-true"
                             style={{background: "none",
                                     border: "none" ,
                                     display: "flex",
                                     flexDirection: "row",
                                     alignItems: "center"}}>
                <div className={'player-name-avatar'}
                     style={{ display: 'flex',
                         alignItems: 'center',
                         justifyContent: "right",
                         gap: '10px'
                     }}>
                    <Avatar src={store.user.image}
                            sx={{ width: 30, height: 30 }}
                            alt={store.user.name}
                    ></Avatar>
                    <h5 style={{color: "white",
                        fontSize: '15px'}}>
                        {store.user.name}
                    </h5>
                </div>
            </Dropdown.Toggle>

            <Dropdown.Menu style={{background: "#c22f2f", padding: 0, }}>
                <Dropdown.Item
                    style={{fontFamily: 'SofiaSans, san-serif', color: "#ffffff", fontSize: "21px"}}
                    onClick={() => store.logout()}
                > Выйти
                </Dropdown.Item>
            </Dropdown.Menu>
        </Dropdown>
    );
};

export default observer(PlayerNameAndAuthButton);
