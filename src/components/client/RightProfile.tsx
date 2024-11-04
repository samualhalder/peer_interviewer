"use client";
import React, { useEffect, useRef, useState } from "react";
import { Separator } from "../ui/separator";
import { Label } from "../ui/label";
import { technologies } from "../../lib/techStack";
import { Textarea } from "../ui/textarea";
import { IoMdClose } from "react-icons/io";

export default function RightProfile() {
  const [resultTechs, setResultTechs] = useState<string[]>([]);
  const [searchParams, setSearchParams] = useState("");
  const [selectedTechs, setSelectedTechs] = useState<string[]>([]);
  const [selectedTechsSet, setSelectedTechsSet] = useState(new Set());
  const [activeRow, setActiveRow] = useState(0);
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    const fetchTechs = () => {
      if (searchParams.trim() === "") {
        setResultTechs([]);
        return;
      }

      const result: string[] = technologies.filter((s: string) =>
        s.startsWith(searchParams.trim())
      );
      const array = result.filter((elm) => !selectedTechsSet.has(elm));
      setResultTechs(array);
    };
    fetchTechs();
  }, [searchParams]);

  const handleRemove = (tech: string) => {
    const removedArray = selectedTechs.filter((result) => result !== tech);
    setSelectedTechs([...removedArray]);
    setSelectedTechsSet(new Set([...removedArray]));
    setActiveRow(0);
  };

  const handleAddTechs = (tech: string) => {
    setSelectedTechs([...selectedTechs, tech]);
    setSelectedTechsSet(new Set([...selectedTechsSet, tech]));
    setSearchParams("");
    inputRef?.current.focus();
  };
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (
      e.key === "Backspace" &&
      searchParams === "" &&
      selectedTechs.length > 0
    ) {
      const tech = selectedTechs[selectedTechs.length - 1];
      handleRemove(tech);
    } else if (e.key === "ArrowDown" && resultTechs.length > 0) {
      setActiveRow((pre) => (pre < resultTechs.length - 1 ? pre + 1 : 0));
    } else if (e.key === "ArrowUp" && resultTechs.length > 0) {
      setActiveRow((pre) => (pre > 0 ? pre - 1 : resultTechs.length - 1));
    } else if (e.key === "Enter" && activeRow >= 0 && resultTechs.length > 0) {
      handleAddTechs(resultTechs[activeRow]);
    }
  };
  return (
    <div className="w-full md:min-w-[65%] flex flex-col p-2 gap-2">
      <h1 className="mx-auto text-5xl ">Public profile</h1>
      <Separator />
      <div className="md:m-[30px]">
        <div>
          <Label htmlFor="about">Write about your self</Label>
          <Textarea cols={12} />
        </div>
        {/* TechStack Setion */}
        <Label htmlFor="teckStack">Tech Stack</Label>
        <div className="flex relative border-[1px] rounded-md focus:border-[#2E82D6] border-gray-300 p-5 ">
          <div className="flex items-center flex-wrap w-[100%]">
            {selectedTechs.map((techs, ind) => (
              <div
                key={ind}
                className="p-2 m-2  bg-[#2E82D6] text-white rounded-md flex items-center justify-between"
              >
                <p>{techs}</p>
                <div onClick={() => handleRemove(techs)}>
                  <IoMdClose size={20} />
                </div>
              </div>
            ))}
            <div className=" relative">
              <input
                ref={inputRef}
                className="border-none outline-0 h-[35px] p-2 "
                placeholder="search for a tech"
                value={searchParams}
                onChange={(e) => setSearchParams(e.target.value)}
                onKeyDown={(e) => handleKeyDown(e)}
              ></input>
              {resultTechs && (
                <ul
                  tabIndex={activeRow}
                  className={` absolute top-[50px]  ${
                    resultTechs.length === 0 ? "hidden" : ""
                  } max-h-[200px] w-[300px] overflow-y-scroll m-5 border-2 border-[#2E82D6] p-2 rounded-lg`}
                >
                  {resultTechs.map((result, ind) => {
                    return (
                      <li
                        key={ind}
                        onClick={() => handleAddTechs(result)}
                        className={` p-1 m-1 ${
                          resultTechs.length !== ind + 1
                            ? "border-b-[1px] border-gray-400"
                            : ""
                        } hover:bg-gray-300 ${
                          activeRow === ind ? " bg-gray-300" : ""
                        }`}
                      >
                        {result}
                      </li>
                    );
                  })}
                </ul>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
