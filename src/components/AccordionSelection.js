import { Center, Heading, LinkBox, LinkOverlay } from "@chakra-ui/react";
import { gsap } from "gsap";
import React from "react";

export default class AccordionSelection extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      title: props.title,
      url: ["youtube", "music", "developer"][props.id],
      selected: props.selected,
    };
    this.el = null;
    var imgUrl = "/img/" + this.state.title.split(" ")[0] + ".jpg";
    this.state.cardBg = imgUrl;
  }

  componentDidMount() {}

  handleEnter = (e) => {
    this.setState((prevState) => {
      return { selected: true };
    });
    gsap.to(this.el, { flexGrow: "5", duration: 0.6, ease: "back.out(2)" });
    gsap.to(this.el, {
      boxShadow: "inset 0 0 2em 100px rgba(0,0,0,0.6)",
      duration: 0.4,
      ease: "none",
    });
  };

  handleLeave = (e) => {
    this.setState((prevState) => {
      return { selected: false };
    });
    gsap.to(this.el, { flexGrow: "1", duration: 0.55, ease: "power1.out" });
    gsap.to(this.el, {
      boxShadow: "inset 0 0 1em 25px rgba(0,0,0,0.4)",
      duration: 0.4,
      ease: "none",
    });
  };

  render() {
    return (
      <>
        <LinkBox
          ref={(rf) => (this.el = rf)}
          overflow="hidden"
          position="relative"
          flexGrow="1"
          alignItems="center"
          onMouseEnter={(e) => this.handleEnter(e)}
          onMouseLeave={(e) => this.handleLeave(e)}
        >
          <div
            className="landingdiv"
            style={{
              background: `scroll center repeat url(${this.state.cardBg})`,
              filter: "blur(8px)",
              backgroundSize: "cover",
              backgroundPositionX: "center",
              backgroundPositionY: "25%",
            }}
          />
          <Center w="100%" h="100%" className="textAccordianDiv">
            <LinkOverlay href={`http://${this.state.url}.jimmyboy.dev`}>
              <Heading className="heading" transition="color 400ms">
                {this.props.title}
              </Heading>
            </LinkOverlay>
          </Center>
        </LinkBox>
      </>
    );
  }
}
