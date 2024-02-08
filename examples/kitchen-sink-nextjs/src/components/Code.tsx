"use client";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import React from "react";
import hljs from "highlight.js";
import "highlight.js/styles/github-dark.css";

// hljs.registerLanguage("graphql", graphql);

export function CodeExample({ code }: { code: string }) {
  const highlightedCode = hljs.highlight(code, {
    language: "graphql",
  }).value;

  return (
    <Accordion type="single" collapsible>
      <AccordionItem value="item-1">
        <AccordionTrigger>Show me the query</AccordionTrigger>
        <AccordionContent>
          <br />
          <pre>
            <code
              className="hljs"
              dangerouslySetInnerHTML={{
                __html: highlightedCode,
              }}
            />
          </pre>
          <br />
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
