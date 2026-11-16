import { Eyebrow } from "@/components/shared/Eyebrow";
import { Reveal } from "@/components/shared/Reveal";
import { SectionDivider } from "@/components/shared/SectionDivider";
import type { InvitationData } from "@/types/wedding";

interface InvitationMessageProps {
  invitation: InvitationData;
}

export function InvitationMessage({ invitation }: InvitationMessageProps) {
  return (
    <section
      aria-labelledby="invitation-message-heading"
      className="px-6 pb-20 sm:px-10 sm:pb-28"
    >
      <div className="mx-auto max-w-4xl text-center">
        <Reveal>
          <SectionDivider />
        </Reveal>

        <Reveal delay={0.06} className="mt-10 sm:mt-12">
          <Eyebrow tone="gold">02 · An Invitation</Eyebrow>
        </Reveal>

        <Reveal delay={0.12}>
          <h2
            id="invitation-message-heading"
            className="balance mx-auto mt-8 max-w-3xl font-display text-[clamp(1.75rem,4.2vw,3.15rem)] leading-[1.32] font-light tracking-[-0.015em] text-teak sm:mt-10"
          >
            {invitation.message}
          </h2>
        </Reveal>

        <Reveal delay={0.2}>
          <p className="mt-9 font-display text-lg text-teak/50 italic sm:mt-11 sm:text-xl">
            {invitation.title}
          </p>
        </Reveal>

        <Reveal delay={0.26}>
          <SectionDivider className="mt-12 opacity-70" />
        </Reveal>
      </div>
    </section>
  );
}
