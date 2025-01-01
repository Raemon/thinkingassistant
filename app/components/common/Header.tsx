'use client';

import Link from 'next/link'
import { getVariants } from './Variants';
import { useEffect, useState } from 'react';

const Header = ({title, v}: {title: string, v?: number}) => {

  const [isDev, setIsDev] = useState(false);

  useEffect(() => {
    setIsDev(window.location.hostname.includes('localhost'));
  }, []);

  const devLinks = isDev ? <div className="flex flex-row justify-between items-center gap-4">
    {getVariants().map((_, index) => <a key={`header-version-${index}`} className="text-sm" href={`/${index}`}>v{index}</a>)}
  </div> : null;

  const devDisplayLinks = isDev ? <> 
    <a className="text-sm" href={`/1x`}>1x</a>
    <a className="text-sm" href={`/2x`}>2x</a>
    <a className="text-sm" href={`/4x`}>4x</a>
  </> : null;

  return (
    <div className="w-full pt-0 sm:pt-4">
      <div className="max-w-[1600px] mx-auto w-full">
        <div className='flex flex-row justify-between items-center gap-4 text-gray-600 z-10 relative'>
          <div className="flex flex-row justify-between items-center gap-4">
            <Link href="/"><h3 className="uppercase text-md">
              <span className="text-gray-400">Rationality.</span>
              <span className="text-gray-400">Training</span>
            </h3></Link>
            {isDev && v && <a className="hidden sm:block text-sm" href={`/${v}`}> v{v}</a>}
            {devLinks}
          </div>
          <div className="flex flex-row justify-between items-center gap-4">
            <span className="hidden sm:inline-block">{devDisplayLinks}</span>
            <div className="text-md pl-6">
              <Link href="/metastrategy">
                <span className="text-gray-400">Apply for a Workshop</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header
