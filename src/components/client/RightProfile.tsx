"use client";
import React, {
  ChangeEvent,
  FormEvent,
  useEffect,
  useRef,
  useState,
} from "react";
import { Separator } from "../ui/separator";
import { Label } from "../ui/label";
import { technologies } from "../../lib/techStack";
import { Textarea } from "../ui/textarea";
import { IoMdClose } from "react-icons/io";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { toast } from "@/hooks/use-toast";

export default function RightProfile({ email }: { email: string }) {
  const [resultTechs, setResultTechs] = useState<string[]>([]);
  const [searchParams, setSearchParams] = useState("");
  const [selectedTechs, setSelectedTechs] = useState<string[]>([]);
  const [selectedTechsSet, setSelectedTechsSet] = useState(new Set());
  const [activeRow, setActiveRow] = useState(0);
  const [formData, setFormData] = useState({});
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
      e.preventDefault();
      handleAddTechs(resultTechs[activeRow]);
    }
  };

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const submitFuntion = async () => {
        const response = await fetch("/api/v1/user/user-profile-set", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ...formData,
            email,
            techStack: JSON.stringify(selectedTechs),
          }),
        });

        const message = await response.text();

        toast({
          description: message,
        });
      };
      submitFuntion();
    } catch (error) {
      toast({
        variant: "destructive",
        description: "some thing went wrong",
      });
    }
  };

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await fetch(`/api/v1/user/get-user-profile/${email}`);
        const data = await response.json();
        setFormData({
          about: data?.about,
          linkedin: data?.linkedin,
          experience: data?.experience,
          portfolio: data?.portfolio,
          resume: data?.resumeLink,
          organization: data?.organization,
        });
        const techStack = JSON.parse(data.techStack);
        console.log(techStack);

        setSelectedTechs([...JSON.parse(data.techStack)]);
        setSelectedTechsSet(new Set([...JSON.parse(data.techStack)]));
      } catch (error) {
        console.log(error);
      }
    };
    fetchUserDetails();
  }, [email]);
  console.log(formData);

  return (
    <div className="w-full md:min-w-[65%] flex flex-col p-2 gap-4">
      <h1 className="mx-auto text-5xl ">Public profile</h1>
      <Separator />
      <form className="md:m-[30px]" onSubmit={(e) => handleSubmit(e)}>
        <div>
          <Label htmlFor="about">Write about your self</Label>
          <Textarea
            value={formData?.about}
            cols={12}
            name="about"
            onChange={(e) => handleChange(e)}
          />
        </div>

        <div>
          <Label className="mb-2">Organization</Label>
          <Input
            value={formData?.organization}
            name="organization"
            onChange={(e) => handleChange(e)}
          />
        </div>
        <div>
          <Label className="mb-2">Exerience</Label>
          <Input
            value={formData?.experience}
            name="experience"
            onChange={(e) => handleChange(e)}
          />
        </div>
        <div>
          <Label className="mb-2">LinkedIn Porfile Link*</Label>
          <Input
            value={formData?.linkedin}
            name="linkedin"
            onChange={(e) => handleChange(e)}
          />
        </div>
        <div>
          <Label className="mb-2">Portfolio Link</Label>
          <Input
            value={formData?.portfolio}
            name="portfolio"
            onChange={(e) => handleChange(e)}
          />
        </div>
        <div>
          <Label className="mb-2">Resume Link*</Label>
          <Input
            value={formData?.resume}
            name="resume"
            onChange={(e) => handleChange(e)}
          />
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
                  className={`z-10 text-white absolute bg-[#2E82D6] top-[50px]  ${
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
                        } hover:bg-blue-400 ${
                          activeRow === ind ? " bg-blue-400" : ""
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
        <div className="m-5">
          <p>* fields must have to filed </p>
        </div>
        <Button className="" type="submit">
          Save
        </Button>
      </form>
      <Separator />
    </div>
  );
}
