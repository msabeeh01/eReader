import React, { useState, useEffect, useRef } from 'react';
import Epub from 'epubjs';

export default function Home() {
 const [book, setBook] = useState(null);
 const areaRef = useRef(null);
 const prevButtonRef = useRef(null);
 const nextButtonRef = useRef(null);

 useEffect(() => {
   fetchBook();
 }, []);

 const fetchBook = async () => {
   const epubBook = await Epub('/Book.epub');
   setBook(epubBook);
   renderBook(epubBook);
 };

 const renderBook = (epubBook) => {
   const res = epubBook.renderTo(areaRef.current, { width: "100%", height: "100%" });
   res.display();

   attachEventListeners(res);
 };

 const attachEventListeners = (res) => {
   prevButtonRef.current.addEventListener('click', () => res.prev());
   nextButtonRef.current.addEventListener('click', () => res.next());
 };

 return (
   <div ref={areaRef} className='bg-green-500 h-screen'>
     <button ref={prevButtonRef}>Previous</button>
     <button ref={nextButtonRef}>Next</button>
   </div>
 );
}