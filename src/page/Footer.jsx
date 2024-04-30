

const Footer = () => {
    return (
        <footer className="mt-5 text-xs sm:w-[600px]"style={{backgroundColor:"#8dc641"}}>
               <div className=" flex justify-between mx-5 p-2" >
            <div className="flex flex-row items-center gap-3">
                <img className="w-5" src="https://i.ibb.co/TPc1ZTt/bangladesh-govt-logo-A2-C7688845-seeklogo-com-removebg-preview.png"/>
                ভূমি সংস্কার বোর্ড, ভূমি মন্ত্রণালয়, গণপ্রজাতন্ত্রী বাংলাদেশ সরকার </div>
            <div className="flex flex-row items-center gap-2">
                <span>কারিগরি সহায়তায়</span>
                <img className="w-24"  src="https://ldtax.gov.bd/img/auto.png"/>
            </div>
</div>
     </footer>
    );
};

export default Footer;