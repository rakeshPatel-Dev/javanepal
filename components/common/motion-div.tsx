"use client"

import { motion, type HTMLMotionProps } from "framer-motion"

type MotionDivProps = HTMLMotionProps<"div">

export function MotionDiv({ children, ...props }: MotionDivProps) {
  return <motion.div {...props}>{children}</motion.div>
}

export function MotionSpan({ children, ...props }: HTMLMotionProps<"span">) {
  return <motion.span {...props}>{children}</motion.span>
}

export function MotionSection({ children, ...props }: HTMLMotionProps<"section">) {
  return <motion.section {...props}>{children}</motion.section>
}
