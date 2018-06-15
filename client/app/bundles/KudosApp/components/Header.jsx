import React, { PropTypes } from 'react'
import { observer } from 'mobx-react'
import AppStore from '../stores/AppStore'

@observer
class Header extends React.Component {
  render() {
    const user = AppStore.user

    const links = [
      {
        title: 'Settings',
        path: '/settings',
        icon: 'cogs',
      },
      {
        title: 'Sign Out',
        path: '/logout',
        icon: 'sign-out-alt',
      },
      {
        title: 'Present',
        path: '/present',
        icon: 'play-circle',
      },
    ]

    return (
      <nav className="header">
        <HeaderStripes />

        <a href="/">
          <img src="assets/kudos_logo.png" className="header-logo" />
        </a>

        <UserMenu avatar={user.avatar} email={user.email} links={links} />
      </nav>
    )
  }
}

export function HeaderStripes() {
  return (
    <div className="header-stripes">
      <span />
      <span />
      <span />
    </div>
  )
}

function UserMenu({ email, avatar, links }) {
  return (
    <div className="user-menu">
      <div className="header-dropdown-container">
        <div className="header-dropdown">
          <div className="header-dropdown-header">
            {avatar ? <img className="user-menu-avatar" src={avatar} alt="avatar" /> : nil}
            <div className="user-menu-email">{email}</div>
            <i className="fas fa-chevron-down" />
          </div>

          <div className="header-dropdown-content">
            {links.map(({ title, path, icon }) => (
              <a key={`menuLink-${title}`} href={path}>
                <i className={`fas fa-${icon} header-dropdown-content-icon`} /> {title}
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

UserMenu.propTypes = {
  avatar: PropTypes.string,
  email: PropTypes.string.isRequired,
  links: PropTypes.array.isRequired,
}

export default Header
