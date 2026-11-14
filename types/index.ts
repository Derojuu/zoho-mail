export interface RelatedProductItem {
  id: string;
  className: string;
  label: string;
  href: string;
  ariaLabel: string;
  description: string;
}

export interface LanguageOption {
  code: string;
  className: string;
  label: string;
  href: string;
  external?: boolean;
}

export interface SubMenuItem {
  label: string;
  href: string;
  isAllLink?: boolean;
  badge?: string;
  external?: boolean;
}

export interface SubLevelGroup {
  title: string;
  items: SubMenuItem[];
  isSubmenuDd?: boolean;
}

export interface NavMenuColumn {
  title: string;
  items: (SubMenuItem | SubLevelGroup)[];
}

export interface ProductNavItem {
  label: string;
  href?: string;
  className: string;
  showOnlyLang?: string;
  noShowLang?: string;
  dropdownWidth?: string;
  items?: (SubMenuItem | SubLevelGroup)[];
  columns?: NavMenuColumn[];
  colMinHeight?: string;
  bottomLink?: SubMenuItem;
}

export interface ProblemSolutionCard {
  id: string;
  toggleAriaLabel: string;
  iconClass: string;
  problemTitle: string;
  problemDesc: string;
  solutionTitle: string;
  solutionDesc: string;
}

export interface TrustedLogoItem {
  name: string;
  src: string;
  width: number;
  height: number;
  sfVar?: string;
  svgWidth?: number;
  svgHeight?: number;
}

export interface TrustBadgeItem {
  id: string;
  tooltipId: string;
  iconClass: string;
  label: string;
  tooltip: string;
}

export interface TestimonialItem {
  id: number;
  quote: string;
  authorName: string;
  authorRole: string;
  avatarVar: string;
  avatarSrc: string;
  sourceLink?: {
    href: string;
    label: string;
    ariaLabel: string;
  };
}

export interface ComplianceBadgeItem {
  className: string;
  ariaLabel: string;
}

export interface FeatureCardItem {
  id: string;
  cardClass: string;
  onScroll: number;
  titlePrefix: string;
  titleHighlight?: string;
  description: string;
  href: string;
  linkAriaLabel: string;
  image?: {
    src: string;
    alt: string;
    width: number;
    height: number;
    isIcon?: boolean;
    isEncryptBar?: boolean;
  };
}

export interface MigrationStepItem {
  step: number;
  title: string;
  description: string;
}

export interface BenefitComparisonItem {
  iconClass: string;
  text: string;
}

export interface FaqItem {
  id: string;
  panelId: string;
  buttonCt: string;
  question: string;
  answer: string;
}

export interface FooterLinkGroup {
  title: string;
  links: {
    label: string;
    href: string;
    external?: boolean;
  }[];
}

export interface OtherProductFooterItem {
  name: string;
  subtitle: string;
  href: string;
  className: string;
  ariaLabel?: string;
}

export interface PricingPlanItem {
  id: string;
  name: string;
  tagline: string;
  monthlyPrice: number;
  annualPrice: number;
  storage: string;
  popular?: boolean;
  features: string[];
}

export interface CartSelection {
  planId: string;
  seats: number;
  billingCycle: "annual" | "monthly";
  domainOption: "existing" | "new";
  domainName: string;
  addOns: string[];
}
