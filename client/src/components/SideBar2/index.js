import React from "react";
import Sidebar from "react-sidebar";
import { SideNav, SideNavItem, Icon, Button } from "react-materialize";
import "../../style.css";

const mql = window.matchMedia(`(min-width: 800px)`);
 
class SideBarReact extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sidebarOpen: true
    };
    this.onSetSidebarOpen = this.onSetSidebarOpen.bind(this);
  }
 
  onSetSidebarOpen(open) {
    this.setState({ sidebarOpen: open });
  }
 
  render() {
    return (
      <Sidebar
        sidebar={<b>Sidebar content</b>}
        open={this.state.sidebarOpen}
        onSetOpen={this.onSetSidebarOpen}
        styles={{ sidebar: { background: "white" } }}
      >
        <button onClick={() => this.onSetSidebarOpen(true)}>
          Open sidebar
        </button>
      </Sidebar>
    );
  }
}
 
export default SideBarReact;

class SideBarReactResponsive extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sidebarDocked: mql.matches,
      sidebarOpen: false
    };
 
    this.mediaQueryChanged = this.mediaQueryChanged.bind(this);
    this.onSetSidebarOpen = this.onSetSidebarOpen.bind(this);
  }
 
  componentWillMount() {
    mql.addListener(this.mediaQueryChanged);
  }
 
  componentWillUnmount() {
    this.state.mql.removeListener(this.mediaQueryChanged);
  }
 
  onSetSidebarOpen(open) {
    this.setState({ sidebarOpen: open });
  }
 
  mediaQueryChanged() {
    this.setState({ sidebarDocked: mql.matches, sidebarOpen: false });
  }
 
  render() {
    return (
      <Sidebar
        sidebar={<b>Sidebar content</b>}
        open={this.state.sidebarOpen}
        docked={this.state.sidebarDocked}
        onSetOpen={this.onSetSidebarOpen}
      >
        <b>Main content</b>
      </Sidebar>
    );
  }
}
 
export default SideBarReactResponsive;


export function SideBarButton() {
  return (
    <div>
      <Button node="button">View Comments</Button>
    </div>
  )

}

export function SideBarNav() {
  //   const slide_menu = document.querySelectorAll(".sidenav");

  //         M.Sidenav.init(slide_menu, {});

  return (
    <div>
      <style>
        {`
            #root > div > div {
              z-index: 99999 !important;
            }
          `}
      </style>
      <SideNav
        id="SideNav-10"
        options={{
          draggable: true,
        }}
        trigger={<Button node="button">View Comments</Button>}
      >
        <SideNavItem
          user={{
            background: "https://placeimg.com/640/480/tech",
            email: "jdandturk@gmail.com",
            image: "static/media/react-materialize-logo.824c6ea3.svg",
            name: "John Doe",
          }}
          userView
        />
        <SideNavItem href="#!icon" icon={<Icon>cloud</Icon>}>
          First Link With Icon
        </SideNavItem>
        <SideNavItem href="#!second">Second Link</SideNavItem>
        <SideNavItem divider />
        <SideNavItem subheader>Subheader</SideNavItem>
        <SideNavItem href="#!third" waves>
          Third Link With Waves
        </SideNavItem>
      </SideNav>
    </div>
  );
}
