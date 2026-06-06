/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface LeadRequest {
  id: string;
  name: string;
  email: string;
  company: string;
  phone: string;
  size: string;
  painPoint: string;
  status: 'pending' | 'reviewed';
  createdAt: string;
}

export interface PipelineStage {
  id: string;
  title: string;
  color: string;
}

export interface Prospect {
  id: string;
  name: string;
  company: string;
  value: number;
  stageId: string;
  activity: string;
  lastContact: string;
}

export interface SectionFeature {
  id: string;
  title: string;
  description: string;
  iconName: string;
}

export interface TargetAudience {
  id: string;
  title: string;
  description: string;
  benefit: string;
  iconName: string;
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

export interface BeforeAfterItem {
  before: string;
  after: string;
}
