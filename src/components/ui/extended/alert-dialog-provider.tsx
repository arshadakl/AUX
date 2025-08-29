'use client';

import * as React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
    AlertDialog,
    AlertDialogContent,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogDescription,
    AlertDialogFooter,
} from "@/components/ui/alert-dialog";
import StateButton from "@/components/ui/extended/state-button";

export const AlertDialogContext = React.createContext<
    <T extends AlertAction>(params: T) => Promise<T["type"] extends "alert" | "confirm" ? boolean : null | string>
>(() => null!);

export type AlertAction =
    | { type: "alert"; title: string; body?: string; cancelButton?: string }
    | {
          type: "confirm";
          title: string;
          body?: string;
          cancelButton?: string;
          actionButton?: string;
          danger?: boolean;
          onAction?: () => Promise<void>;
      }
    | {
          type: "prompt";
          title: string;
          body?: string;
          cancelButton?: string;
          actionButton?: string;
          danger?: boolean;
          defaultValue?: string;
          onAction?: () => Promise<void>;
          inputProps?: React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>;
      }
    | { type: "close" };

interface AlertDialogState {
    open: boolean;
    title: string;
    body: string;
    type: "alert" | "confirm" | "prompt";
    cancelButton: string;
    actionButton: string;
    danger?: boolean;
    onAction?: () => Promise<void>;
    defaultValue?: string;
    inputProps?: React.PropsWithoutRef<
        React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>
    >;
}

export function alertDialogReducer(state: AlertDialogState, action: AlertAction): AlertDialogState {
    switch (action.type) {
        case "close":
            return { ...state, open: false };
        case "alert":
        case "confirm":
        case "prompt":
            return {
                ...state,
                open: true,
                ...action,
                cancelButton: action.cancelButton || (action.type === "alert" ? "Okay" : "Cancel"),
                actionButton: ("actionButton" in action && action.actionButton) || "Okay",
            };
        default:
            return state;
    }
}

export function AlertDialogProvider({ children }: { children: React.ReactNode }) {
    const [state, dispatch] = React.useReducer(alertDialogReducer, {
        open: false,
        title: "",
        body: "",
        type: "alert",
        cancelButton: "Cancel",
        actionButton: "Okay",
        danger: false,
    });

    const [isLoading, setIsLoading] = React.useState(false);

    const resolveRef = React.useRef<(tf: any) => void>(null);

    function close() {
        dispatch({ type: "close" });
        resolveRef.current?.(false);
    }

    function confirm(value?: string) {
        const closeAndResolve = () => {
            dispatch({ type: "close" });
            resolveRef.current?.(value ?? true);
            setIsLoading(false);
        };

        setIsLoading(true);
        if (state.onAction) {
            state
                .onAction()
                .then(closeAndResolve)
                .catch(() => setIsLoading(false));
        } else {
            closeAndResolve();
        }
    }

    const dialog = React.useCallback(async <T extends AlertAction>(params: T) => {
        dispatch(params);

        return new Promise<T["type"] extends "alert" | "confirm" ? boolean : null | string>((resolve) => {
            resolveRef.current = resolve;
        });
    }, []);

    return (
        <AlertDialogContext.Provider value={dialog}>
            {children}
            <AlertDialog
                open={state.open}
                onOpenChange={(open) => {
                    if (!open) close();
                    return;
                }}
            >
                <AlertDialogContent asChild>
                    <form
                        onSubmit={(event) => {
                            event.preventDefault();
                            confirm(event.currentTarget.prompt?.value);
                        }}
                    >
                        <AlertDialogHeader>
                            <AlertDialogTitle>{state.title}</AlertDialogTitle>
                            {state.body ? <AlertDialogDescription>{state.body}</AlertDialogDescription> : null}
                        </AlertDialogHeader>
                        {state.type === "prompt" && (
                            <Input name="prompt" defaultValue={state.defaultValue} {...state.inputProps} />
                        )}
                        <AlertDialogFooter>
                            <Button variant={"outline"} type="button" onClick={close}>
                                {state.cancelButton}
                            </Button>
                            {state.type === "alert" ? null : (
                                <StateButton
                                    isLoading={isLoading}
                                    isDisabled={isLoading}
                                    variant={state.danger ? "destructive" : "default"}
                                    type="submit"
                                >
                                    {state.actionButton}
                                </StateButton>
                            )}
                        </AlertDialogFooter>
                    </form>
                </AlertDialogContent>
            </AlertDialog>
        </AlertDialogContext.Provider>
    );
}

type Params<T extends "alert" | "confirm" | "prompt"> = Omit<Extract<AlertAction, { type: T }>, "type"> | string;

export function useConfirm() {
    const dialog = React.useContext(AlertDialogContext);

    return React.useCallback(
        (params: Params<"confirm">) => {
            return dialog({
                ...(typeof params === "string" ? { title: params } : params),
                type: "confirm",
            });
        },
        [dialog],
    );
}

export function usePrompt() {
    const dialog = React.useContext(AlertDialogContext);

    return (params: Params<"prompt">) =>
        dialog({
            ...(typeof params === "string" ? { title: params } : params),
            type: "prompt",
        });
}

export function useAlert() {
    const dialog = React.useContext(AlertDialogContext);
    return (params: Params<"alert">) =>
        dialog({
            ...(typeof params === "string" ? { title: params } : params),
            type: "alert",
        });
}
