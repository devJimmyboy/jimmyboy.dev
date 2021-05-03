import React, { useEffect} from 'react'
import {Button, Heading, Flex, useColorModeValue} from '@chakra-ui/react'
import { gsap } from "gsap";
import { ColorModeSwitcher } from './ColorModeSwitcher';
import { TextPlugin } from "gsap/TextPlugin";

gsap.registerPlugin(TextPlugin);

export default class HeaderBar extends React.Component {

    constructor(props){
        super(props);

        this.tl = gsap.timeline({
            paused:true
          });
        this.headingText = "Jimmyboy.dev";
        this.headerText = null;
    }
    
    componentDidMount(){
        this.tl.play();
    }

    render(){
        return (
            <Flex className="header" align="center" justify="space-between"  padding="1em" zIndex={2}>
                    <Flex alignSelf="flex-start" >
                                <LogoAnim tl={this.tl}/>
                    </Flex>
                    
                    <Flex alignSelf="flex-end" direction="row" >
                        <Button mr="4" onClick={() => {window.location.assign("https://www.youtube.com/channel/UC1zCi0FHlVlpXm0gbxh4sBw")}}>Youtube</Button>
                        <ColorModeSwitcher alignSelf="flex-end" />
                    </Flex>
                    
            </Flex>
        )
    }
}

function LogoAnim(props){
    const color = useColorModeValue("0,0,0","255,255,255");
    const tl = props.tl;
    var headRef = null;
    useEffect(() => {
        //letter anim
        tl.fromTo(headRef, {text: {value: ""}},{duration: 5, text: {value: "Jimmyboy.dev", speed:0.2}}, 0);
        //Cursor Anim
        tl.fromTo(".heading-typewriter", {"border-right-color": `rgba(${color},0.75)`,},{"border-right-color": `rgba(${color},0)`, repeat: -1, duration: 1.5},0);
        
    },[headRef, color, tl])
        
    
    
    return (
        <Heading as="h3" ref={el => headRef = el} className="line-1 heading-typewriter" justifySelf="left" size="lg">Jimmyboy.dev</Heading>
    );
}
