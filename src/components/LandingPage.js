import React from 'react'
import {Flex, Button, Text, Modal,  ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, ColorModeScript} from '@chakra-ui/react'
import AccordionSelection from './AccordionSelection'
import HeaderBar from './HeaderBar';
import { BrowserRouter as Router } from 'react-router-dom';

export default class LandingPage extends React.Component {


    constructor(props) {
        super(props);
        this.state = {
            domains: ["Jimmyboy ~ Youtube","Jimby ~ Artist","Jimmy ~ Developer"],
            showDialog: false,
        };
        
        this.getAccords = this.getAccords.bind(this);
    }
    
    componentDidMount(){
        const beenShown = localStorage.getItem("modalShown");
        if(!beenShown)
            this.timer = setTimeout(() => this.setState({showDialog: true}), 10000);
    }
    
    componentWillUnmount(){
        clearTimeout(this.timer);
    }

    render() {
        return (
        <Router>
            <Modal 
            isOpen={this.state.showDialog}
            onClose={() => {this.setState({ showDialog: false }); try{localStorage.setItem("modalShown","true")}catch(err){console.log(err);}}}
            onMouseEnter={() => this.domElem.forEach((e) => e.handleLeave())}
            preserveScrollBarGap={true}
            size="md">
            <ModalOverlay/>
            <ModalContent>
                <ModalHeader>Like What You See?</ModalHeader>
                <ModalCloseButton/>
                <ModalBody>
                    <Text mb="1rem">
                        I'm not talking about me, silly! 
                        I'm talking about the fun animations from swiping your mouse vertically! 
                        If you want to see more, press <strong>'Learn More.'</strong>
                    </Text>
                </ModalBody>
                <ModalFooter alignContent="end">
                    <Button bg="#9147ff" color="#ffffff" onClick={() => {window.location.assign("https://developer.jimmyboy.dev/demos");}}>Learn More</Button>
                </ModalFooter>
            </ModalContent>
                
            </Modal>
            <HeaderBar/>
            <Flex className="flexMain" direction="column" height="100%" overflow="hidden" alignItems="stretch">
                
                {this.getAccords()}
            </Flex>
        </Router>
        )
    }
    
    getAccords(){
        this.domElem = this.state.domains.map((val, i) => {
            return <AccordionSelection  key={"select"+i} title={val} id={i}/>;
        });
        return this.domElem;
    }
    
    
    
    
}

// class CornerDialog extends Component {

//     constructor(props){
//         super(props);
        
//     }
//     render() {
//         return (
//             <div>
                
//             </div>
//         )
//     }
// }

