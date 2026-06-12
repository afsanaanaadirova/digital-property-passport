import PdfIcon from "@svg/document-text.svg?react"
import MP4Icon from "@svg/document-text.svg?react"
import ImageIcon from "@svg/document-text.svg?react"
import FigIcon from "@svg/document-text.svg?react"
import DefaultFileIcon from "@svg/document-text.svg?react"
import { DocumentIconType } from "./document_icon.type";

const DocumentIcon = ({ fileFormat, size, className = "" }: DocumentIconType) => {
  const icons = {
    pdf: PdfIcon,
    mp4: MP4Icon,
    fig: FigIcon,
    jpg: ImageIcon,
    jpeg: ImageIcon,
    png: ImageIcon,
  };

  const RenderIcon = icons[fileFormat] || DefaultFileIcon;
  return <RenderIcon width={size} height={size} className={className} />;
};

export default DocumentIcon;
