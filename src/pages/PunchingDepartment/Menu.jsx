import React from 'react'
import LinkButton from '../../components/LinkButton'
import TextComponent from '../../components/Text'
import SubHeading from '../../components/SubHeading'
import { GiRolledCloth } from "react-icons/gi";
import { FaProductHunt } from "react-icons/fa";

const Menu = () => {
    return (
        <div>
               
    
        <SubHeading title={'Punching Department'} />

        <div class="flex items-center justify-center flex-col md:flex-row gap-4">

            
                    <LinkButton buttonName={'Sampling Department'} icon={<img src="/Images/sample.png" alt="cutting" width={50} height={50} />} url={'/Punching/Sampling'}  />
    
                    <LinkButton buttonName={'Production Department'} icon={<img src="/Images/production.png" alt="cutting" width={50} height={50} />} url={'/Punching/Production'} />

                 
                  
            </div>
    
          
    
       
        </div>
      )
}

export default Menu