import ImageMarquee from "@/components/about_us_marque";
import AboutUs from "@/components/AboutUs";
import InstagramSection from "@/components/InstagramSection";
import Reservation from "@/components/Reservation";
import WhyChooseUs from "@/components/WhyChooseUs";

export default function Home() {
  return (
    <>
    <div className="grid justify-center items-center text-6xl gap-3 bg-white">
    <div className="flex justify-center">
    <img 
    src={"/images/PocoLoco_Logo.png"} 
    className="h-50 w-50 object-contain"
    />
    </div>

    <div className="font-antonio -mt-10">POCOLOCO PIZZA pocoloco pizza font-antonio</div>
    <div className="font-inter">POCOLOCO PIZZA pocoloco pizza font-inter</div>
    <div className="font-fredoka">POCOLOCO PIZZA pocoloco pizza font-fredoka</div>
    <div className="font-myFont">POCOLOCO PIZZA pocoloco pizza font-my-font</div>
    <div className="font-sans">POCOLOCO PIZZA pocoloco pizza font-sans</div>
    <div className="font-serif">POCOLOCO PIZZA pocoloco pizza font-serif</div>
    <div className="font-mono">POCOLOCO PIZZA pocoloco pizza font-mono</div>
    <div className="flex justify-center">
    <img 
    src={"/images/PocoLoco_Logo.png"} 
    className="h-50 w-50 object-contain"
    />
    </div>
    <div className="font-gambero">POCOLOCO PIZZA pocoloco pizza font-gambero</div>
    <div className="font-bahn">POCOLOCO PIZZA pocoloco pizza font-bahn</div>
    <div className="font-mont">POCOLOCO PIZZA pocoloco pizza font-mont</div>
    </div>
    <WhyChooseUs />
    <Reservation />
    <InstagramSection />
    <AboutUs />

        </>
  );
}
