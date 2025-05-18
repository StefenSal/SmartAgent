import { motion } from "framer-motion";
import { useTranslation } from "next-i18next";
import type { KeyboardEvent, RefObject } from "react";
import { useState } from "react";
import { FaCog, FaPlay, FaStar } from "react-icons/fa";
import { FiSend } from "react-icons/fi";

import { useAgentStore } from "../../stores";
import type { Message } from "../../types/message";
import AppTitle from "../AppTitle";
import Button from "../Button";
import ExampleAgents from "../console/ExampleAgents";
import { ToolsDialog } from "../dialog/ToolsDialog";
import Globe from "../Globe";
import Input from "../Input";

type LandingProps = {
  messages: Message[];
  disableStartAgent: boolean;
  handlePlay: () => void;
  handleKeyPress: (e: KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  goalInputRef: RefObject<HTMLInputElement>;
  goalInput: string;
  setGoalInput: (string) => void;
  setShowSignInDialog: (boolean) => void;
  setAgentRun: (newName: string, newGoal: string) => void;
};
const Landing = (props: LandingProps) => {
  const [showToolsDialog, setShowToolsDialog] = useState(false);

  const { t } = useTranslation("indexPage");
  const agent = useAgentStore.use.agent();

  return (
    <>
      <ToolsDialog show={showToolsDialog} setOpen={setShowToolsDialog} />
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.75, type: "easeInOut" }}
        className="z-10"
      >
        <AppTitle />
      </motion.div>
      <div className="absolute left-0 right-0 m-auto grid place-items-center overflow-hidden opacity-40">
        <Globe />
      </div>
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.75, delay: 1, type: "easeInOut" }}
        className="z-10"
      >
        <ExampleAgents setAgentRun={props.setAgentRun} setShowSignIn={props.setShowSignInDialog} />
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.75, delay: 0.5, type: "easeInOut" }}
        className="z-10 flex w-full flex-col gap-6"
      >
        <div className="relative w-full">
          <Input
            inputRef={props.goalInputRef}
            disabled={agent != null}
            value={props.goalInput}
            onChange={(e) => props.setGoalInput(e.target.value)}
            onKeyDown={props.handleKeyPress}
            placeholder={`${t("PLACEHOLDER_AGENT_GOAL")}`}
            type="textarea"
          />
          <div className="pointer-events-none absolute bottom-3 right-3 z-10">
            <div className="pointer-events-auto group">
              <Button
                onClick={props.handlePlay}
                disabled={!props.goalInput || props.goalInput.trim() === ""}
                className={
                  (!props.goalInput || props.goalInput.trim() === "")
                    ? "h-8 w-8 aspect-square rounded-full bg-gray-200 text-gray-400 flex items-center justify-center cursor-not-allowed p-0 border-0 shadow-none"
                    : "h-8 w-8 aspect-square rounded-full bg-blue-600 text-white flex items-center justify-center hover:bg-blue-700 transition-all duration-200 p-0 border-0 shadow-md"
                }
              >
                <span className="sr-only">Send</span>
                <FiSend className="text-base m-auto rotate-45" />
              </Button>
              {(!props.goalInput || props.goalInput.trim() === "") && (
                <div className="absolute bottom-12 left-1/2 -translate-x-1/2 whitespace-nowrap rounded bg-gray-800 px-2 py-1 text-xs text-white opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
                  Message is empty
                </div>
              )}
            </div>
          </div>
        </div>
      </motion.div>
    </>
  );
};

export default Landing;
