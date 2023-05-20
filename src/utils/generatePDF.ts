/* eslint-disable new-cap */
import { jsPDF } from 'jspdf';

const MARKDOWN_RGX =
  /\s+(?=(?:\*{1,2}[^*]+\*{1,2}|[^*])*$)(?=(?:(?:~{2}[^~]+~{2}|[^~])*$))/g;
const INDENT_SPACE = 20;

const generatePDF = () => {
  const doc = new jsPDF();
  const { fontName: FONT } = doc.getFont();
  let cursorPos = 20;

  const writeLine = (line: string) => {
    const texts = line.split(MARKDOWN_RGX);
    let offsetX = INDENT_SPACE;

    texts.forEach((text: string) => {
      const parsedText = text.replace(/\*|~/g, '');

      if (text.includes('**')) {
        doc.setFont(FONT, 'bold');
        doc.text(parsedText, offsetX, cursorPos);
      } else if (text.includes('*')) {
        doc.setFont(FONT, 'italic');
        doc.text(parsedText, offsetX, cursorPos);
      } else if (text.includes('~~')) {
        const parsedTextWidth = doc.getTextWidth(parsedText);
        doc.text(parsedText, offsetX, cursorPos);
        doc.line(
          offsetX,
          cursorPos - 1.5,
          offsetX + parsedTextWidth,
          cursorPos - 1.5,
        );
      } else {
        doc.setFont(FONT, 'normal');
        doc.text(parsedText, offsetX, cursorPos);
      }
      // Add to offset of x on current line
      offsetX += doc.getTextWidth(parsedText) + doc.getTextWidth(' ');
    });

    cursorPos += 5;
  };

  const parseMarkdown = (content: string) => {
    const lines = content.split('\n');
    lines.forEach((line) => writeLine(line));
  };

  const exportPDF = (filename: string) => {
    doc.save(filename);
  };

  return { parseMarkdown, exportPDF };
};

export default generatePDF;
