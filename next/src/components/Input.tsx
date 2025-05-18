import clsx from "clsx";
import React, { useRef, useEffect, forwardRef } from "react";
import type { ChangeEvent, KeyboardEvent, ReactNode, RefObject } from "react";

import Label from "./Label";
import type { toolTipProperties } from "../types";

type InputElement = HTMLInputElement | HTMLTextAreaElement;

interface InputProps {
  small?: boolean; // Will lower padding and font size. Currently only works for the default input
  left?: ReactNode;
  value: string | number | undefined;
  onChange: (e: ChangeEvent<InputElement>) => void;
  placeholder?: string;
  disabled?: boolean;
  type?: string;
  subType?: string;
  attributes?: { [key: string]: string | number | string[] }; // attributes specific to input type
  toolTipProperties?: toolTipProperties;
  inputRef?: RefObject<InputElement>;
  onKeyDown?: (e: KeyboardEvent<InputElement>) => void;
}

const Input = forwardRef<InputElement, InputProps>((props, ref) => {
  const isTypeTextArea = () => {
    return props.type === "textarea";
  };

  // For auto-expanding textarea
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  useEffect(() => {
    if (isTypeTextArea() && textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = textareaRef.current.scrollHeight + "px";
    }
  }, [props.value]);

  const handleInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = textareaRef.current.scrollHeight + "px";
    }
    props.onChange(e);
  };

  return (
    <div className="items-left z-5 flex h-fit w-full flex-col rounded-xl text-lg text-slate-12 md:flex-row md:items-center">
      {props.left && (
        <Label left={props.left} type={props.type} toolTipProperties={props.toolTipProperties} />
      )}
      {isTypeTextArea() ? (
        <textarea
          className={clsx(
            "delay-50 w-full min-h-[48px] max-h-96 resize-none overflow-hidden rounded-xl border-2 border-slate-7 bg-slate-1 p-2 pr-12 text-sm tracking-wider text-slate-12 outline-none transition-all selection:bg-sky-300 placeholder:text-slate-8 hover:border-sky-200 focus:border-sky-400 md:text-lg",
            props.disabled && "cursor-not-allowed",
            props.left && "md:rounded-l-none",
            props.small && "text-sm sm:py-[0]"
          )}
          rows={2}
          ref={(el) => {
            textareaRef.current = el;
            if (typeof ref === "function") ref(el);
            else if (ref) (ref as React.MutableRefObject<HTMLTextAreaElement | null>).current = el;
            if (props.inputRef) (props.inputRef as React.MutableRefObject<HTMLTextAreaElement | null>).current = el;
          }}
          placeholder={props.placeholder}
          value={props.value}
          onChange={handleInput}
          onInput={handleInput}
          disabled={props.disabled}
          onKeyDown={props.onKeyDown}
          {...props.attributes}
        />
      ) : (
        <input
          className={clsx(
            "w-full rounded-xl border-2 border-slate-7 bg-slate-1 p-2 py-1 text-sm tracking-wider text-slate-12 outline-none transition-all duration-200 selection:bg-sky-300 placeholder:text-slate-8 hover:border-sky-200 focus:border-sky-400 sm:py-3 md:text-lg",
            props.disabled && "cursor-not-allowed",
            props.left && "md:rounded-l-none",
            props.small && "text-sm sm:py-[0]"
          )}
          ref={props.inputRef as RefObject<HTMLInputElement>}
          placeholder={props.placeholder}
          type={props.type}
          value={props.value}
          onChange={props.onChange}
          disabled={props.disabled}
          onKeyDown={props.onKeyDown}
          {...props.attributes}
        />
      )}
    </div>
  );
});

Input.displayName = "Input";

export default Input;
