import Header from "./Header";
import Link from 'next/link'

export type VariantProps = {
  v?: number;
  getColor?: (rating: number) => string;
  height?: number;
  background?: string;
  color?: string;
  shortBeta?: boolean;
}

export interface Variant extends VariantProps {
  ComponentName: React.ComponentType<VariantProps>;
}

const cardClass = "justify-around mb-10 shadow-lg p-4 pb-3 max-w-[600px] bg-white";

export const getVariants = (): Variant[] => [
]

export function Variants() {
  return <div className="flex flex-wrap">
    {getVariants().map(({ComponentName, ...props}, index) => (
      <div key={index} className="border-r-2 border-b-2 border-black h-[1600px] overflow-hidden relative">
        <ComponentName {...props} v={index} />
      </div>
    ))}
  </div>
}

export function Variants2X() {
  return <div>
    <Header title="Variants" />
    <div className="flex flex-wrap">
      {getVariants().map(({ComponentName, ...props}, index) => (
        <div key={index} className="border-r-2 border-b-2 border-black overflow-hidden relative w-1/2 max-h-[500px] box-border">
          <div className="origin-top-left scale-50 w-[200%]">
            <ComponentName key={index} {...props} v={index} />
          </div>
          <Link className="absolute bottom-[10px] right-[10px] text-[0.8rem] text-[cobalt]" href={`/${index}`}>View Page</Link>
        </div>
      ))}
    </div>
  </div>
}

export function Variants4X() {
  return <div>
    <Header title="Variants" />
    <div className="flex flex-wrap">
      {getVariants().map(({ComponentName, ...props}, index) => (
        <div key={index} className="border-r-2 border-b-2 border-black overflow-hidden relative w-1/4 max-h-[500px] box-border">
          <div className="origin-top-left scale-50 w-[200%]">
            <ComponentName key={index} {...props} v={index} />
          </div>
          <Link className="absolute bottom-[10px] right-[10px] text-[0.8rem] text-[cobalt]" href={`/${index}`}>View Page</Link>
        </div>
      ))}
    </div>
  </div>
}