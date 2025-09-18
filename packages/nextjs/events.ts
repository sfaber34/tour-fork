export type ISODate = `${number}-${number}-${number}`;

export type Event = {
  title: string;
  location: string;
  description: string;
  // dateStart is required for events to be displayed
  dateStart: ISODate;
  // can be null if it's same as dateStart
  dateEnd?: ISODate;
};

export const events: Event[] = [
  {
    title: "A past single day event",
    location: "Location 1",
    description: "We'll show off SpeedRun Ethereum and dive into vibe coding onchain apps and the art of one-shotting.",
    dateStart: "2025-09-10",
  },
  {
    title: "A past event with a range of days",
    location: "Location 2",
    description: "We'll show off SpeedRun Ethereum and dive into vibe coding onchain apps and the art of one-shotting.",
    dateStart: "2025-08-28",
    dateEnd: "2025-09-01",
  },
];
