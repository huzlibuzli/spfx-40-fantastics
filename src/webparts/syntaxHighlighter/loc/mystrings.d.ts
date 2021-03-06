declare interface ISyntaxHighlighterStrings {
  PropertyPaneDescription: string;
  BasicGroupName: string;
  Language: string;
  Theme: string;
  Toolbar: string;
  Gutter: string;
  AutoLinks: string;
  SmartTabs: string;
}

declare module 'SyntaxHighlighterStrings' {
  const strings: ISyntaxHighlighterStrings;
  export = strings;
}
