/**
 * `DataGridDisplayDocumentsPics` - A component for displaying various types of documents and images.
 * This component handles rendering different file types including PDFs, Word documents, Excel spreadsheets,
 * emails, and images. It also provides a download functionality for the displayed file.
 *
 * @component
 *
 * @param {Object} props - The properties passed to the component.
 * @param {string} props.title - The title of the document or image being displayed.
 * @param {string} props.document - The base64 encoded string of the document or image.
 * @param {string} props.mime - The MIME type of the document or image.
 *
 * @returns {React.Element} - A div element containing the rendered document or image and a download button.
 *
 * @example
 * <DataGridDisplayDocumentsPics
 *   title="Sample Document"
 *   document="base64EncodedString..."
 *   mime="application/pdf"
 * />
 */

// React !
import React, { useState, useEffect } from "react";

// simple components
import Text from "@basicElems/Text";
import Btn from "@basicElems/Btn";

// All the texts and icons
import { dataRefs } from "@dataRefs/GlobalTextArray";

// Package to read XLS files
import { OutTable, ExcelRenderer } from 'react-excel-renderer';

// Package to read DOCX files
import mammoth from 'mammoth';

// Package to read EML files
import { readEml } from 'eml-parse-js';
import DOMPurify from 'dompurify';

import { Interweave } from "interweave";

// Function to format a simple date
import { formatToDateForDisplay } from "@functions/formatingData";

// Types for the MIMES (to help for the render, get that out somwhere else)
const MIME_TYPES = {
    PDF: 'pdf',
    DOCX: 'wordprocessingml',
    DOCM: "application/vnd.ms-word.document.macroenabled.12",
    DOC: "application/msword",
    XLSX: 'spreadsheetml',
    XLS: "ms-excel",
    XLS2: ".xls",
    ELM: 'message',
    MSG: ".eml",
    IMAGE_PREFIX: 'image',
    TEXT: 'text/plain',

};

function DataGridDisplayDocumentsPics({
    title,
    document,
    mime
}) {

    ////////////////
    // setter for the file readers
    // xls file readers setters
    const [cols, setCols] = useState([]);
    const [rows, setRows] = useState([]);
    // docx file setter
    const [wordContent, setWordContent] = useState('');
    // eml file setter
    const [emlContent, setEmlContent] = useState('')
    // create *.txt content reader
    const [textContent, setTextContent] = useState('');
    // checkers for the mime type (maybe need improvement later if the mimes dont include this type of words ?)
    const isPdf = mime.toLowerCase().includes(MIME_TYPES.PDF)
    const isWord = mime.toLowerCase().includes(MIME_TYPES.DOCX) || mime.toLowerCase().includes(MIME_TYPES.DOCM)
    const isOldWord = mime.toLowerCase().includes(MIME_TYPES.DOC)
    const isXLS = mime.toLowerCase().includes(MIME_TYPES.XLSX) || mime.toLowerCase().includes(MIME_TYPES.XLS) || mime.toLowerCase().includes(MIME_TYPES.XLS2)
    const isMail = mime.toLowerCase().includes(MIME_TYPES.ELM)
    const isText = mime === MIME_TYPES.TEXT;

    // Image type files
    const isPicture = mime.startsWith(MIME_TYPES.IMAGE_PREFIX);
    // Document type files
    const isDocument = isPdf || isXLS || isWord || isOldWord || isMail || isText
    // File

    const isSupported = isDocument || isPicture;

    // ".pdf"
    // "application/pdf"
    const file = `data:${mime};base64,${document}`

    ////////////////
    // Function to read docx files
    const base64ToArrayBuffer = (base64) => {
        const binaryString = window.atob(base64);
        const bytes = new Uint8Array(binaryString.length);
        for (let i = 0; i < binaryString.length; i++) {
            bytes[i] = binaryString.charCodeAt(i);
        }
        return bytes.buffer;
    }

    // Function to decode base64 to UTF-8 text
    const base64ToUtf8 = (base64) => {
        const binaryString = atob(base64);
        const bytes = new Uint8Array(binaryString.length);
        for (let i = 0; i < binaryString.length; i++) {
            bytes[i] = binaryString.charCodeAt(i);
        }
        const decoder = new TextDecoder('utf-8');
        return decoder.decode(bytes);
    };

    ////////////////
    // Useeffect to buffer/render the different file types from base64 to a readable object
    useEffect(() => {

        // Handle XLS files
        if (isXLS && document) {
            fetch(file)
                .then(res => res.blob())
                .then(blob => {
                    ExcelRenderer(blob, (err, resp) => {
                        if (err) {
                            console.log(err);
                        } else {
                            setCols(resp.cols);
                            setRows(resp.rows);
                        }
                    });
                });
        }

        // Handle Word documents
        if (isWord && document) {
            const arrayBuffer = base64ToArrayBuffer(document);
            mammoth.convertToHtml({ arrayBuffer: arrayBuffer })
                .then(result => {
                    setWordContent(result.value);
                })
                .catch(error => {
                    console.error('Error rendering DOCX:', error);
                });
        }


        // Handle email files
        if (isMail && document) {

            // Convert base64 to blob
            fetch(file)
                .then(res => res.blob())
                .then(blob => {
                    // Use FileReader to read the blob as text
                    const reader = new FileReader();
                    reader.onload = function () {
                        readEml(reader.result, (err, ReadEmlJson) => {
                            if (err) {
                                console.error('Error parsing EML:', err);
                            } else {
                                setEmlContent(ReadEmlJson);
                            }
                        });
                    };
                    reader.readAsText(blob);
                });
        }

        if (isText && document) {
            const text = base64ToUtf8(document);
            setTextContent(text);
        }

    }, [document, mime, isXLS, isWord, isMail, isOldWord]);

    ////////////////
    // JSX Render Download File Component
    const FileDownload = React.memo(() => {

        return (
            <a download={title}
                className={`center`}
                target={`_blank`}
                href={file} >

                <Btn css={`row`} xl={true}>

                    <div className={`flex items-center justify-between`}>

                        <dataRefs.filePresentIcon size={15} style={{ paddingRight: "5px" }} />

                        <span className={`center`}>
                            {dataRefs.download}
                        </span>

                    </div>

                </Btn>

            </a>
        )
    })

    ////////////////
    // Render Mail Component
    const RenderMail = () => {
        if (!emlContent) return <p>Chargement du mail ...</p>;

        ////////////////
        // Extract body content using regex
        const getBodyContent = (html) => {
            const bodyMatch = html.match(/<body[^>]*>([\s\S]*)<\/body>/i);
            return bodyMatch ? bodyMatch[1] : html;
        };

        ////////////////
        // Sanitize HTML content
        const sanitizeHtml = (html) => {
            if (typeof window !== 'undefined') {
                return DOMPurify.sanitize(html);
            }
            return html;
        };

        const bodyContent = getBodyContent(emlContent.html);
        const sanitizedContent = sanitizeHtml(bodyContent);

        ////////////////
        // JSX RenderMail
        return (

            <div className={`col`}>

                <span>
                    De: {emlContent.from && `${emlContent?.from?.name} ${emlContent?.from?.email}`}
                </span>

                <span>
                    A: {emlContent.to && emlContent.to.map((elem, index) => (
                        <span key={index}>{elem.name} {elem.email}</span>
                    ))}
                </span>

                <span>CC: {emlContent.cc && `${emlContent?.cc?.name} ${emlContent?.cc?.email}`}</span>

                <span>Date: {emlContent.date && formatToDateForDisplay(emlContent?.date)}</span>

                <span>Sujet: {emlContent.subject && emlContent.subject}</span>

                <div><Interweave content={sanitizedContent} /></div>

            </div>
        );
    };



    ////////////////
    // JSX
    return (

        <div className={`col justify-around items-center p-1 m-1 br-bg-5-light-7`}>

            <div className={`w-full place-content-center`}>

                <Text css={`text-error text-center text-xl p-3`}>
                    {title}
                </Text>

            </div>

            {isDocument &&

                <>
                    {/* Render PDF */}

                    {mime
                        && document
                        && isPdf
                        &&

                        <iframe src={file} width="1280px" height="700px"
                            title="pdf reader"></iframe>
                    }

                    {/* Render Email */}

                    {mime
                        && document
                        && isMail
                        &&

                        <>
                            {mime && document && isMail && <RenderMail />}
                        </>
                    }

                    {/* Render Excel */}

                    {mime
                        && document
                        && isXLS
                        &&

                        <>
                            {cols.length > 0 && rows.length > 0 ? (

                                <OutTable
                                    data={rows}
                                    columns={cols}
                                    tableClassName={`exel-table-visualisation shadow`}
                                    tableHeaderRowClass={`excel-table-visualisation-header`}
                                />


                            ) : (

                                <p>Chargement des données du tableau Excel ...</p>
                            )}
                        </>
                    }

                    {/* Render Word Document */}

                    {mime
                        && document
                        && isWord
                        &&

                        <div>
                            <Interweave content={wordContent} />
                        </div>
                    }

                    {isText &&
                        <div className={`w-full p-3`}>
                            <pre style={{ whiteSpace: 'pre-wrap', wordWrap: 'break-word' }}>
                                {textContent}
                            </pre>
                        </div>
                    }

                    {/* "Old Doc files can't be rendered : download needed */}

                    {mime && document && isOldWord &&


                        <p>Preview impossible pour le format .doc. Vous pouvez le télécharger pour le visualiser</p>

                    }

                </>

            }

            {isPicture &&
                <div>
                    {/* Render Image */}
                    <img src={file}
                        alt="Preview Impossible"
                        style={{ width: "80h" }} />
                </div>
            }


            {!isSupported && (
                <div>
                    <p>Impossible de prévisualiser le fichier. Veuillez le télécharger pour le consulter.</p>
                </div>
            )}

            {/* Render Download Button */}

            <FileDownload />

        </div>

    );
}

export default DataGridDisplayDocumentsPics;