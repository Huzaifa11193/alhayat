import React from 'react';
import LinkButton from '../../components/LinkButton';
import SubHeading from '../../components/SubHeading';
import { FaCut } from 'react-icons/fa';
import { GiSewingMachine } from 'react-icons/gi';
import { CiCrop } from 'react-icons/ci';
import { MdIncompleteCircle } from 'react-icons/md';
import { FaStore } from 'react-icons/fa';
import { IoIosExit } from 'react-icons/io';
import { BiSolidPurchaseTag } from 'react-icons/bi';
import { FaComputer } from 'react-icons/fa6';

const Index = () => {
  return (
    <div>
      <SubHeading title={'Dashboard'} />

      <div className="flex  flex-col md:flex-row gap-8 justify-center items-center ">
        <LinkButton
          url={'/Punching'}
          buttonName={'Punching Department'}
          icon={<img src="/Images/punching.png" alt="punching" width={50} height={50} />}
        />

<LinkButton
          url={'/MarketReceived'}
          buttonName={'Market Received'}
          icon={<img src="/Images/punching.png" alt="Market Received" width={50} height={50} />}
        />


        <LinkButton
          buttonName={'Cutting Department'}
          url={'/Cutting'}
          icon={<img src="/Images/cutting.png" alt="cutting" width={50} height={50} />}
        />
        <LinkButton url={'/Production'} buttonName={'Production Department'} icon={<img src="/Images/production.png" alt="production" width={50} height={50} />} />

        </div>

      <div className="flex flex-col md:flex-row gap-8 justify-center items-center mt-5">

      <LinkButton buttonName={'Cropping Department'} url={'/Cropping'} icon={<img src="/Images/cropping.png" alt="cropping" width={50} height={50} />} />
     
        <LinkButton buttonName={'Finishing Department'} url={'/Finishing'} icon={<img src="/Images/finishing.png" alt="finishing" width={50} height={50} />} />

        <LinkButton buttonName={'Market Department'} icon={<img src="/Images/market.png" alt="market" width={50} height={50} />} />

        <LinkButton buttonName={'Percuiment Department'} icon={<img src="/Images/procurement.png" alt="percuiment" width={50} height={50} />} />

      </div>

      <div className="flex flex-col md:flex-row gap-8 justify-center items-center mt-5">
      <LinkButton buttonName={'Gate Exit Department'} icon={<img src="/Images/exit.png" alt="exit" width={50} height={50} />} />
    
      </div>
    </div>
  );
};

export default Index;
