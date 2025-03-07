"use client";
import * as React from "react";
import {
  Bot,
  FileStack,
  HelpCircle,
  User,
} from "lucide-react";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import { searchModalAtom } from "@/app/_store/atoms/searchModal";
import { useAtom } from "jotai";
import { useHotkeys } from "react-hotkeys-hook";
import { EmptyBlock } from "@/components/domain/EmptyBlock";
import useSwr from "swr";
import { listCopilots } from "@/data/copilot";
import { useRouter } from "next/navigation";
import Link from "next/link";
export function SearchModal() {
  const [open, setOpen] = useAtom(searchModalAtom);
  useHotkeys("ctrl+/", (e) => {
    e.preventDefault();
    setOpen(true);
  });
  const { data: copilots } = useSwr("copilotsList", listCopilots);
  const { push } = useRouter();
  return (
    <CommandDialog open={open} onOpenChange={setOpen}>
      <CommandInput placeholder="Type a command or search..." />
      <CommandList>
        <CommandEmpty>
          <EmptyBlock>
            <p>No results found.</p>
          </EmptyBlock>
        </CommandEmpty>
        <CommandGroup heading="Suggestions">
          <Link href="/">
            <CommandItem>
              <Bot className="mr-2 h-4 w-4" />
              <span>Copilots</span>
            </CommandItem>
          </Link>
          <Link href="https://docs.opencopilot.so" target="_blank">
            <CommandItem>
              <HelpCircle className="mr-2 h-4 w-4" />
              <span>Help</span>
            </CommandItem>
          </Link>
          <Link href="https://docs.opencopilot.so" target="_blank">
            <CommandItem>
              <FileStack className="mr-2 h-4 w-4" />
              <span>Documentation</span>
            </CommandItem>
          </Link>
        </CommandGroup>
        <CommandSeparator />
        <CommandGroup heading="Copilots">
          {copilots?.data.map((copilot) => (
            <CommandItem
              key={copilot.id}
              onSelect={() => push("/copilot/" + copilot.id)}
            >
              <User className="mr-2 h-4 w-4" />
              <span>
                {copilot.name}
                <span className="hidden">{copilot.id}</span>
              </span>
            </CommandItem>
          ))}
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  );
}
