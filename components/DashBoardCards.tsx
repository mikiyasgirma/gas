import { FaGasPump } from "react-icons/fa";
import { AiOutlineUser } from "react-icons/ai";
import { MdEventAvailable } from "react-icons/md";
import { HiQueueList } from "react-icons/hi2";

const DashBoardCards = () => {
  return (
    <>
      <div className="flex space-x-12 w-full p-12">
        <div className="relative flex flex-col min-w-0 mb-6 break-words bg-[#17A2B8] text-white shadow-soft-xl rounded-2xl bg-clip-border">
          <div className="flex-auto p-4">
            <div className="flex flex-wrap -mx-3">
              <div className="flex-none w-2/3 max-w-full px-3 text-lg">
                <div>
                  <p className="mb-0 font-sans font-semibold leading-normal text-sm">
                    Number of Registred Gas Stations
                  </p>
                  <h5 className="mb-0 font-bold text-4xl py-2">162</h5>
                </div>
              </div>
              <div className="w-4/12 max-w-full px-3 ml-auto text-right flex-0">
                <FaGasPump size={46} />
              </div>
            </div>
          </div>
        </div>
        <div className="relative flex flex-col min-w-0 mb-6 break-words bg-[#E8C4C4] text-white shadow-soft-xl rounded-2xl bg-clip-border">
          <div className="flex-auto p-4">
            <div className="flex flex-wrap -mx-3">
              <div className="flex-none w-2/3 max-w-full px-3 text-lg">
                <div>
                  <p className="mb-0 font-sans font-semibold leading-normal text-sm">
                    Number of Active Users
                  </p>
                  <h5 className="mb-0 font-bold text-4xl py-2">162</h5>
                </div>
              </div>
              <div className="w-4/12 max-w-full px-3 ml-auto text-right flex-0">
                <AiOutlineUser size={46} />
              </div>
            </div>
          </div>
        </div>
        <div className="relative flex flex-col min-w-0 mb-6 break-words bg-[#DC3545] text-white shadow-soft-xl rounded-2xl bg-clip-border">
          <div className="flex-auto p-4">
            <div className="flex flex-wrap -mx-3">
              <div className="flex-none w-2/3 max-w-full px-3 text-lg">
                <div>
                  <p className="mb-0 font-sans font-semibold leading-normal text-sm">
                    Number of Available Gas Stations
                  </p>
                  <h5 className="mb-0 font-bold text-4xl py-2">162</h5>
                </div>
              </div>
              <div className="w-4/12 max-w-full px-3 ml-auto text-right flex-0">
                <MdEventAvailable size={46} />
              </div>
            </div>
          </div>
        </div>
        <div className="relative flex flex-col min-w-0 mb-6 break-words bg-[#28A745] text-white shadow-soft-xl rounded-2xl bg-clip-border">
          <div className="flex-auto p-4">
            <div className="flex flex-wrap -mx-3">
              <div className="flex-none w-2/3 max-w-full px-3 text-lg">
                <div>
                  <p className="mb-0 font-sans font-semibold leading-normal text-sm">
                    Average Queue Status
                  </p>
                  <h5 className="mb-0 font-bold text-xl py-2">Medium</h5>
                </div>
              </div>
              <div className="w-4/12 max-w-full px-3 ml-auto text-right flex-0">
                <HiQueueList size={46} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default DashBoardCards;
