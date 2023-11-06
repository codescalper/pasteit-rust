import { Button } from "@nextui-org/react"
import { AiOutlineRight } from "react-icons/ai"
import confetti from 'canvas-confetti';
import { IconContext } from "react-icons";

 


const Steps = () => {
    const handleConfetti = () => {
        confetti();
    }  
  return (
    <div>
      <p className="text-base font-semibold leading-7 text-purple-800 dark:text-purple-500 text-center mb-8">
        Takes 3 steps to share code snippets. No account required.
      </p>
      <div className="grid grid-cols-12 justify-center items-center gap-4 text-center mb-12">
        <div></div>
        <div className="flex items-center justify-around space-x-2 col-span-4">
          Paste
          <IconContext.Provider value={{ className: "text-purple-500 dark:text-yellow-500 text-xl " }}>
            <AiOutlineRight width={40} />
          </IconContext.Provider>
        </div>
        <div className="flex items-center justify-around space-x-2 col-span-4">
          Create
          <IconContext.Provider value={{ className: "text-purple-500 dark:text-yellow-500 text-xl " }}>
            <AiOutlineRight width={40} />
          </IconContext.Provider>

        </div>
        <div className="flex items-center justify-around space-x-2">
          <div className="flex justify-center items-center ">
            <Button 
              variant="shadow"
              className="relative overflow-visible rounded-full hover:-translate-y-1 px-4 xl:px-12 md:px-7 shadow-xl bg-background/30 after:content-[''] after:absolute after:rounded-full after:inset-0 after:bg-background/40 after:z-[-1] after:transition after:!duration-500 hover:after:scale-150 hover:after:opacity-0 "
              size="sm"
              onClick={handleConfetti}
            >Share</Button>
          </div>
        </div>
      </div>
    </div>
  )
}


export default Steps;