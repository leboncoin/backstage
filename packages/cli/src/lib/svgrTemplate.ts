/*
 * Copyright 2020 The Backstage Authors
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * This template, together with loaders in the bundler and packages, allows
 * for SVG to be imported directly as MUI SvgIcon components by suffixing
 * them with .icon.svg
 */
export function svgrTemplate(variables: any, { tpl }: any) {
  const iconName = {
    ...variables.componentName,
    name: `${variables.componentName.replace(/icon$/, '')}Icon`,
  };

  const defaultExport = {
    type: 'ExportDefaultDeclaration',
    declaration: iconName,
  };
  return tpl`
${variables.imports}
import SvgIcon from '@material-ui/core/SvgIcon';

${variables.interfaces}
const ${iconName} = props => React.createElement(SvgIcon, props, ${variables.jsx.children});
${defaultExport}`;
}
