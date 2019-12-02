import React, { Component } from 'react';
// import { Document, Page, pdfjs } from "react-pdf";
import { Document, Page } from 'react-pdf/dist/entry.webpack';
import 'react-pdf/dist/Page/AnnotationLayer.css';


class PdfPreview extends Component {
  state = {
    pages: null
  }

  onDocumentLoad = ({numPages}) => {
    this.setState({
      pages: [...Array(numPages).keys()].map((x, i) => <Page renderAnnotationLayer={false} key={`page${i + 1}`} pageNumber={i + 1}/>)
    })
  }
  render() {

    return (
      <Document loading={this.props.loading} file={this.props.file} onLoadSuccess={this.onDocumentLoad}>
        {this.state.pages}
      </Document>
    );
  }
}

export default PdfPreview;
