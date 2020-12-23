/* eslint-disable */
import React, { useState } from 'react';
// @ts-ignore
import { Document, Page } from '../../node_modules/react-pdf/dist/esm/entry.webpack.js';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';

const highlightPattern = (text: string, pattern: string) => {
  const splitText = text.split(pattern);

  if (splitText.length <= 1) {
    return text;
  }

  const matches: any = text.match(pattern);

  return splitText.reduce((arr: any[], element: any, index: number) => (matches[index] ? [
    ...arr,
    element,
    <mark key={index}>
      {matches[index]}
    </mark>,
  ] : [...arr, element]), []);
}

const Sample = () => {
  const [file, setFile] = useState('');
  const [numPages, setNumPages] = useState(null);
  const [searchText, setSearchText] = useState('');

  const onChange = (event: any) => {
    setSearchText(event.target.value);
  }

  const onFileChange = (event: any) => {
    setFile(event.target.files[0]);
  }

  const onDocumentLoadSuccess = ({ numPages: nextNumPages }: any) => {
    setNumPages(nextNumPages);
  }

  return (
    <div className="Example">
      <header>
        <h1>react-pdf sample page</h1>
      </header>
      <div className="Example__container">
        <div className="Example__container__load">
          <label htmlFor="file">Load from file:</label>
          {' '}
          <input
            onChange={onFileChange}
            type="file"
          />
        </div>
        <div className="Example__container__document">
          <Document
            file={file}
            onLoadSuccess={onDocumentLoadSuccess}
            options={{
              cMapUrl: '../../cmaps',
              cMapPacked: true,
            }}
          >
            {
              Array.from(
                new Array(numPages),
                (_, index) => (
                  <Page
                    key={`page_${index + 1}`}
                    pageNumber={index + 1}
                    customTextRenderer={({ str }: any) => highlightPattern(str, searchText)}
                  />
                ),
              )
            }
          </Document>
        </div>
        <div>
          <label htmlFor="search">Search:</label>
          <input type="search" id="search" value={searchText} onChange={onChange} />
        </div>
      </div>
    </div>
  );
}

export default Sample
