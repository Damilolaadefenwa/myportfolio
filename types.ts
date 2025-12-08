/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

export interface Project {
  id: number;
  title: string;
  description: string;
  tags: string[];
  links: {
    demo?: string;
    repo?: string;
    design?: string;
  };
  category: 'Web' | 'App' | 'Scripting' | 'Design';
}

export interface Education {
  school: string;
  degree: string;
  year: string;
  details: string[];
}

export interface SkillCategory {
  title: string;
  skills: string[];
}

// Added Product interface to support ObjectCard and ProductSelector components
export interface Product {
  id: number | string;
  name: string;
  imageUrl: string;
}
