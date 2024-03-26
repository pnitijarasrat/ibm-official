import React, { useState } from "react";
import { Link } from 'react-router-dom'
import './Nav.css'
import useViewportWidth from "../function/useViewWidth";
import { useAuth } from "../Authenticate/AuthProvider";
import {
  CloseOutlined,
  MenuOutlined
} from '@ant-design/icons';

export default function Nav() {
  const auth = useAuth()
  const width = useViewportWidth()
  const [isOpen, setIsOpen] = useState(false)

  const handleMenuClick = () => {
    setIsOpen(!isOpen)
  }

  return (
    <nav className="Nav">
      <div className="logo">IBM&CO</div>
      {
        auth.token ?
          width > 800 ?
            <ul className="desktop-nav">
              <Link to={'/'}>Home</Link>
              <Link to={'/recruit'}>Recruit</Link>
              <Link to={'/link-tree'}>All Link</Link>
              <Link to={'/learning'}>Lesson</Link>
              <button onClick={() => auth.logOut()}>Log Out</button>
              <Link to={`/${localStorage.getItem("site")}`}>
                <span className="nav-user">{localStorage.getItem("fullName")}</span>
              </Link>
            </ul>
            :
            <ul style={{ marginRight: '16px' }}>
              <div onClick={handleMenuClick} >
                <MenuOutlined />
              </div>
            </ul>
          : <ul>
          </ul>
      }
      {
        isOpen &&
        <div className="mobile-backdrop">
          <div className="mobile-nav">
            <div onClick={handleMenuClick}>
              <CloseOutlined />
            </div>
            <Link to={`/${localStorage.getItem("site")}`}>
              <span className="nav-user">{localStorage.getItem("fullName")}</span>
            </Link>
            <Link to={'/'}>Home</Link>
            <Link to={'/recruit'}>Recruit</Link>
            <Link to={'/link-tree'}>All Link</Link>
            <Link to={'/learning'}>Lesson</Link>
            <button onClick={() => {
              setIsOpen(false)
              auth.logOut()
            }}>Log Out</button>
          </div>
        </div>
      }
    </nav>
  )
}
