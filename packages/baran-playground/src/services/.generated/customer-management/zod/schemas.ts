// @ts-nocheck
import { z } from "zod";

export type AccountOwnerDto = z.infer<typeof AccountOwnerDto>;
export const AccountOwnerDto = z.object({
  customerNumber: z.number().optional(),
  nationalCode: z.union([z.string(), z.null()]).optional(),
  firstName: z.union([z.string(), z.null()]).optional(),
  lastName: z.union([z.string(), z.null()]).optional(),
  customerType: z.union([z.string(), z.null()]).optional(),
  shahabNumber: z.union([z.string(), z.null()]).optional(),
  birthDate: z.union([z.string(), z.null()]).optional(),
});

export type RelationTypeEnum = z.infer<typeof RelationTypeEnum>;
export const RelationTypeEnum = z.union([
  z.literal(0),
  z.literal(1),
  z.literal(2),
  z.literal(3),
  z.literal(4),
  z.literal(5),
  z.literal(6),
]);

export type AccountOwnershipTypeEnum = z.infer<typeof AccountOwnershipTypeEnum>;
export const AccountOwnershipTypeEnum = z.union([z.literal(0), z.literal(1), z.literal(2)]);

export type AccountOutputDto = z.infer<typeof AccountOutputDto>;
export const AccountOutputDto = z.object({
  accountNumber: z.number().optional(),
  accountTypeName: z.union([z.string(), z.null()]).optional(),
  accountTypeCode: z.union([z.string(), z.null()]).optional(),
  intCat: z.union([z.string(), z.null()]).optional(),
  currencyType: z.union([z.string(), z.null()]).optional(),
  accountStatus: z.union([z.string(), z.null()]).optional(),
  accountStatusCode: z.union([z.string(), z.null()]).optional(),
  isShared: z.boolean().optional(),
  owners: z.union([z.array(AccountOwnerDto), z.null()]).optional(),
  iban: z.union([z.string(), z.null()]).optional(),
  relationType: RelationTypeEnum.optional(),
  accountOwnershipType: AccountOwnershipTypeEnum.optional(),
});

export type CardOriginEnum = z.infer<typeof CardOriginEnum>;
export const CardOriginEnum = z.union([z.literal(1), z.literal(2)]);

export type CardOutputDto = z.infer<typeof CardOutputDto>;
export const CardOutputDto = z.object({
  cardNumber: z.number().optional(),
  firstName: z.union([z.string(), z.null()]).optional(),
  lastName: z.union([z.string(), z.null()]).optional(),
  cardOrigin: CardOriginEnum.optional(),
  cardStatus: z.union([z.string(), z.null()]).optional(),
  cardStatusDesc: z.union([z.string(), z.null()]).optional(),
  cardType: z.union([z.string(), z.null()]).optional(),
  cardTypeDesc: z.union([z.string(), z.null()]).optional(),
});

export type FacilityRelationTypeEnum = z.infer<typeof FacilityRelationTypeEnum>;
export const FacilityRelationTypeEnum = z.union([z.literal(0), z.literal(1), z.literal(2)]);

export type FacilityAccountOutputDto = z.infer<typeof FacilityAccountOutputDto>;
export const FacilityAccountOutputDto = z.object({
  accountNumber: z.number().optional(),
  openStatus: z.union([z.string(), z.null()]).optional(),
  accountTypeCode: z.union([z.string(), z.null()]).optional(),
  accountTypeName: z.union([z.string(), z.null()]).optional(),
  currencyType: z.union([z.string(), z.null()]).optional(),
  facilityType: FacilityRelationTypeEnum.optional(),
  accountSubType: z.union([z.string(), z.null()]).optional(),
});

export type AccountAndCardOutputDto = z.infer<typeof AccountAndCardOutputDto>;
export const AccountAndCardOutputDto = z.object({
  accounts: z.union([z.array(AccountOutputDto), z.null()]).optional(),
  cards: z.union([z.array(CardOutputDto), z.null()]).optional(),
  facilityAccounts: z.union([z.array(FacilityAccountOutputDto), z.null()]).optional(),
});

export type AccountConsiderDeleted = z.infer<typeof AccountConsiderDeleted>;
export const AccountConsiderDeleted = z.object({
  accountNumber: z.number().optional(),
  addDeletedAccounts: z.boolean().optional(),
});

export type AccountDto = z.infer<typeof AccountDto>;
export const AccountDto = z.object({
  accountNumber: z.number().optional(),
  lastUpdate: z.string().optional(),
  counter: z.number().optional(),
  customerId: z.number().optional(),
});

export type ActionTypeEnum = z.infer<typeof ActionTypeEnum>;
export const ActionTypeEnum = z.union([z.literal(0), z.literal(1), z.literal(2), z.literal(3)]);

export type AddAccountCommand = z.infer<typeof AddAccountCommand>;
export const AddAccountCommand = z.object({
  accountNumber: z.number().optional(),
});

export type AddAliasCommand = z.infer<typeof AddAliasCommand>;
export const AddAliasCommand = z.object({
  keyToken: z.union([z.string(), z.null()]).optional(),
  alias: z.union([z.string(), z.null()]).optional(),
});

export type AddAliasOutputDto = z.infer<typeof AddAliasOutputDto>;
export const AddAliasOutputDto = z.object({
  keyToken: z.union([z.string(), z.null()]).optional(),
});

export type BanRuleActorLevelEnum = z.infer<typeof BanRuleActorLevelEnum>;
export const BanRuleActorLevelEnum = z.union([
  z.literal(1),
  z.literal(2),
  z.literal(3),
  z.literal(4),
  z.literal(5),
  z.literal(6),
]);

export type AddBanRuleActorLevelCommand = z.infer<typeof AddBanRuleActorLevelCommand>;
export const AddBanRuleActorLevelCommand = z.object({
  username: z.union([z.string(), z.null()]).optional(),
  actorLevel: BanRuleActorLevelEnum.optional(),
});

export type RuleTypeEnum = z.infer<typeof RuleTypeEnum>;
export const RuleTypeEnum = z.union([z.literal(1), z.literal(2), z.literal(3)]);

export type AddBanRuleCommand = z.infer<typeof AddBanRuleCommand>;
export const AddBanRuleCommand = z.object({
  ruleType: RuleTypeEnum.optional(),
  property: z.union([z.string(), z.null()]).optional(),
  groupName: z.union([z.string(), z.null()]).optional(),
  valueFrom: z.union([z.string(), z.null()]).optional(),
  valueTo: z.union([z.string(), z.null()]).optional(),
  start: z.union([z.string(), z.null()]).optional(),
  end: z.union([z.string(), z.null()]).optional(),
  messageKey: z.union([z.string(), z.null()]).optional(),
});

export type AddBanRulePersonCommand = z.infer<typeof AddBanRulePersonCommand>;
export const AddBanRulePersonCommand = z.object({
  nationalID: z.union([z.string(), z.null()]).optional(),
  startTimeUtc: z.union([z.string(), z.null()]).optional(),
  endTimeUtc: z.union([z.string(), z.null()]).optional(),
  description: z.union([z.string(), z.null()]).optional(),
});

export type AddCardCommand = z.infer<typeof AddCardCommand>;
export const AddCardCommand = z.object({
  cardNumber: z.number().optional(),
  title: z.union([z.string(), z.null()]).optional(),
  forAll: z.boolean().optional(),
});

export type AddedCardForCustomerType = z.infer<typeof AddedCardForCustomerType>;
export const AddedCardForCustomerType = z.union([z.literal(1), z.literal(2)]);

export type AddCardOutputDto = z.infer<typeof AddCardOutputDto>;
export const AddCardOutputDto = z.object({
  counter: z.number().optional(),
  addedCardType: AddedCardForCustomerType.optional(),
});

export type AddCityCommand = z.infer<typeof AddCityCommand>;
export const AddCityCommand = z.object({
  provinceId: z.number().optional(),
  code: z.union([z.string(), z.null()]).optional(),
  title: z.union([z.string(), z.null()]).optional(),
});

export type AddOrganizationClaimToUserCommand = z.infer<typeof AddOrganizationClaimToUserCommand>;
export const AddOrganizationClaimToUserCommand = z.object({
  nationalCode: z.union([z.string(), z.null()]).optional(),
  organizationId: z.number().optional(),
  organizationUnitId: z.number().optional(),
});

export type AddPresenterCodeCommand = z.infer<typeof AddPresenterCodeCommand>;
export const AddPresenterCodeCommand = z.object({
  keyToken: z.union([z.string(), z.null()]).optional(),
  presenterCode: z.union([z.string(), z.null()]).optional(),
});

export type AddSettingDraftCommand = z.infer<typeof AddSettingDraftCommand>;
export const AddSettingDraftCommand = z.object({
  key: z.union([z.string(), z.null()]).optional(),
  value: z.union([z.string(), z.null()]).optional(),
  isAppSetting: z.boolean().optional(),
});

export type AddSignGrantedCommand = z.infer<typeof AddSignGrantedCommand>;
export const AddSignGrantedCommand = z.object({
  accountNumber: z.number().optional(),
});

export type AddUserSettingCommand = z.infer<typeof AddUserSettingCommand>;
export const AddUserSettingCommand = z.object({
  name: z.union([z.string(), z.null()]).optional(),
  value: z.union([z.string(), z.null()]).optional(),
});

export type AppNameDto = z.infer<typeof AppNameDto>;
export const AppNameDto = z.object({
  name: z.union([z.string(), z.null()]).optional(),
});

export type ApproveSettingDraftCommand = z.infer<typeof ApproveSettingDraftCommand>;
export const ApproveSettingDraftCommand = z.object({
  draftId: z.number().optional(),
});

export type BanRuleDto = z.infer<typeof BanRuleDto>;
export const BanRuleDto = z.object({
  id: z.number().optional(),
  ruleType: RuleTypeEnum.optional(),
  property: z.union([z.string(), z.null()]).optional(),
  groupName: z.union([z.string(), z.null()]).optional(),
  valueFrom: z.union([z.string(), z.null()]).optional(),
  valueTo: z.union([z.string(), z.null()]).optional(),
  start: z.union([z.string(), z.null()]).optional(),
  end: z.union([z.string(), z.null()]).optional(),
  messageKey: z.union([z.string(), z.null()]).optional(),
});

export type CardDto = z.infer<typeof CardDto>;
export const CardDto = z.object({
  cardNumber: z.number().optional(),
  lastUpdate: z.string().optional(),
  counter: z.number().optional(),
  cardStatus: z.union([z.string(), z.null()]).optional(),
  cardStatusDesc: z.union([z.string(), z.null()]).optional(),
  cardType: z.union([z.string(), z.null()]).optional(),
  cardTypeDesc: z.union([z.string(), z.null()]).optional(),
  customerId: z.number().optional(),
});

export type ChannelNameEnum = z.infer<typeof ChannelNameEnum>;
export const ChannelNameEnum = z.union([
  z.literal(1),
  z.literal(2),
  z.literal(4),
  z.literal(8),
  z.literal(16),
  z.literal(32),
]);

export type CheckAccountOutputDto = z.infer<typeof CheckAccountOutputDto>;
export const CheckAccountOutputDto = z.object({
  accountNumber: z.number().optional(),
  accountTypeName: z.union([z.string(), z.null()]).optional(),
  accountTypeCode: z.union([z.string(), z.null()]).optional(),
  intCat: z.union([z.string(), z.null()]).optional(),
  currencyType: z.union([z.string(), z.null()]).optional(),
  accountStatus: z.union([z.string(), z.null()]).optional(),
  accountStatusCode: z.union([z.string(), z.null()]).optional(),
  isShared: z.boolean().optional(),
  owners: z.union([z.array(AccountOwnerDto), z.null()]).optional(),
  iban: z.union([z.string(), z.null()]).optional(),
  relationType: RelationTypeEnum.optional(),
  accountOwnershipType: AccountOwnershipTypeEnum.optional(),
  isAccountRelated: z.boolean().optional(),
  accountNo: z.number().optional(),
});

export type CheckAccountQuery = z.infer<typeof CheckAccountQuery>;
export const CheckAccountQuery = z.object({
  customerNo: z.number().optional(),
  channel: ChannelNameEnum.optional(),
  accounts: z.union([z.array(z.number()), z.null()]).optional(),
  accountConsiderDeleteds: z.union([z.array(AccountConsiderDeleted), z.null()]).optional(),
});

export type CheckBanRulePersonOutputDto = z.infer<typeof CheckBanRulePersonOutputDto>;
export const CheckBanRulePersonOutputDto = z.object({
  isBan: z.boolean().optional(),
});

export type CheckBanRulePersonQuery = z.infer<typeof CheckBanRulePersonQuery>;
export const CheckBanRulePersonQuery = z.object({
  nationalID: z.union([z.string(), z.null()]).optional(),
});

export type CheckCardOutputDto = z.infer<typeof CheckCardOutputDto>;
export const CheckCardOutputDto = z.object({
  isCardRelated: z.boolean().optional(),
  cardOrigin: CardOriginEnum.optional(),
});

export type CheckCardQuery = z.infer<typeof CheckCardQuery>;
export const CheckCardQuery = z.object({
  customerNo: z.number().optional(),
  cardNo: z.number().optional(),
  channel: ChannelNameEnum.optional(),
});

export type CheckCardValidForActivationQuery = z.infer<typeof CheckCardValidForActivationQuery>;
export const CheckCardValidForActivationQuery = z.object({
  customerNo: z.number().optional(),
  cardNo: z.number().optional(),
});

export type CheckFacilityBelongToCustomerQuery = z.infer<typeof CheckFacilityBelongToCustomerQuery>;
export const CheckFacilityBelongToCustomerQuery = z.object({
  customerNo: z.number().optional(),
  facilityAccountNumber: z.number().optional(),
});

export type CheckOtpRegisterZeroLevelCommand = z.infer<typeof CheckOtpRegisterZeroLevelCommand>;
export const CheckOtpRegisterZeroLevelCommand = z.object({
  password: z.union([z.string(), z.null()]).optional(),
  keyToken: z.union([z.string(), z.null()]).optional(),
});

export type CheckOtpRegisterZeroLevelOutputDto = z.infer<typeof CheckOtpRegisterZeroLevelOutputDto>;
export const CheckOtpRegisterZeroLevelOutputDto = z.object({
  keyToken: z.union([z.string(), z.null()]).optional(),
  hasAccount: z.boolean().optional(),
});

export type CityOutputDto = z.infer<typeof CityOutputDto>;
export const CityOutputDto = z.object({
  cityTitle: z.union([z.string(), z.null()]).optional(),
  cityCode: z.union([z.string(), z.null()]).optional(),
  provinceCode: z.union([z.string(), z.null()]).optional(),
});

export type ConfirmRegisterZeroLevelCommand = z.infer<typeof ConfirmRegisterZeroLevelCommand>;
export const ConfirmRegisterZeroLevelCommand = z.object({
  keyToken: z.union([z.string(), z.null()]).optional(),
  password: z.union([z.string(), z.null()]).optional(),
  confirmPassword: z.union([z.string(), z.null()]).optional(),
  preservePreviousPassword: z.boolean().optional(),
});

export type ConfirmRegisterZeroLevelOutputDto = z.infer<typeof ConfirmRegisterZeroLevelOutputDto>;
export const ConfirmRegisterZeroLevelOutputDto = z.object({
  userName: z.union([z.string(), z.null()]).optional(),
});

export type ConfirmUpgradeForLevelTwoCommand = z.infer<typeof ConfirmUpgradeForLevelTwoCommand>;
export const ConfirmUpgradeForLevelTwoCommand = z.object({
  cardNumber: z.number().optional(),
  cvV2: z.union([z.string(), z.null()]).optional(),
  expireDate: z.union([z.string(), z.null()]).optional(),
  code: z.union([z.string(), z.null()]).optional(),
});

export type ConfirmUpgradeForLevelTwoOutputDto = z.infer<typeof ConfirmUpgradeForLevelTwoOutputDto>;
export const ConfirmUpgradeForLevelTwoOutputDto = z.object({
  deviceId: z.union([z.string(), z.null()]).optional(),
});

export type NationalityCodeEnum = z.infer<typeof NationalityCodeEnum>;
export const NationalityCodeEnum = z.union([
  z.literal(1),
  z.literal(2),
  z.literal(3),
  z.literal(4),
  z.literal(5),
  z.literal(6),
  z.literal(7),
  z.literal(8),
  z.literal(9),
  z.literal(10),
  z.literal(11),
  z.literal(12),
  z.literal(13),
  z.literal(14),
  z.literal(15),
  z.literal(16),
  z.literal(17),
  z.literal(18),
  z.literal(19),
  z.literal(20),
  z.literal(21),
  z.literal(22),
  z.literal(23),
  z.literal(24),
  z.literal(25),
  z.literal(26),
  z.literal(27),
  z.literal(28),
  z.literal(29),
  z.literal(30),
  z.literal(31),
  z.literal(32),
  z.literal(33),
  z.literal(34),
  z.literal(35),
  z.literal(36),
  z.literal(37),
  z.literal(38),
  z.literal(39),
  z.literal(40),
  z.literal(41),
  z.literal(42),
  z.literal(43),
  z.literal(44),
  z.literal(45),
  z.literal(46),
  z.literal(47),
  z.literal(48),
  z.literal(49),
  z.literal(50),
  z.literal(51),
  z.literal(52),
  z.literal(53),
  z.literal(54),
  z.literal(55),
  z.literal(56),
  z.literal(57),
  z.literal(58),
  z.literal(59),
  z.literal(60),
  z.literal(61),
  z.literal(62),
  z.literal(63),
  z.literal(64),
  z.literal(65),
  z.literal(66),
  z.literal(67),
  z.literal(68),
  z.literal(69),
  z.literal(70),
  z.literal(71),
  z.literal(72),
  z.literal(73),
  z.literal(74),
  z.literal(75),
  z.literal(76),
  z.literal(77),
  z.literal(78),
  z.literal(79),
  z.literal(80),
  z.literal(81),
  z.literal(82),
  z.literal(83),
  z.literal(84),
  z.literal(85),
  z.literal(86),
  z.literal(87),
  z.literal(88),
  z.literal(89),
  z.literal(90),
  z.literal(91),
  z.literal(92),
  z.literal(93),
  z.literal(94),
  z.literal(95),
  z.literal(96),
  z.literal(97),
  z.literal(98),
  z.literal(99),
  z.literal(100),
  z.literal(101),
  z.literal(102),
  z.literal(103),
  z.literal(104),
  z.literal(105),
  z.literal(106),
  z.literal(107),
  z.literal(108),
  z.literal(109),
  z.literal(110),
  z.literal(111),
  z.literal(112),
  z.literal(113),
  z.literal(114),
  z.literal(115),
  z.literal(116),
  z.literal(117),
  z.literal(118),
  z.literal(119),
  z.literal(120),
  z.literal(121),
  z.literal(122),
  z.literal(123),
  z.literal(124),
  z.literal(125),
  z.literal(126),
  z.literal(127),
  z.literal(128),
  z.literal(129),
  z.literal(130),
  z.literal(131),
  z.literal(132),
  z.literal(133),
  z.literal(134),
  z.literal(135),
  z.literal(136),
  z.literal(137),
  z.literal(138),
  z.literal(139),
  z.literal(140),
  z.literal(141),
  z.literal(142),
  z.literal(143),
  z.literal(144),
  z.literal(145),
  z.literal(146),
  z.literal(147),
  z.literal(148),
  z.literal(149),
  z.literal(150),
  z.literal(151),
  z.literal(152),
  z.literal(153),
  z.literal(154),
  z.literal(155),
  z.literal(156),
  z.literal(157),
  z.literal(158),
  z.literal(159),
  z.literal(160),
  z.literal(161),
  z.literal(162),
  z.literal(163),
  z.literal(164),
  z.literal(165),
  z.literal(166),
  z.literal(167),
  z.literal(168),
  z.literal(169),
  z.literal(170),
  z.literal(171),
  z.literal(172),
  z.literal(173),
  z.literal(174),
  z.literal(175),
  z.literal(176),
  z.literal(177),
  z.literal(178),
  z.literal(179),
  z.literal(180),
  z.literal(181),
  z.literal(182),
  z.literal(183),
  z.literal(184),
  z.literal(185),
  z.literal(186),
  z.literal(187),
  z.literal(188),
  z.literal(189),
  z.literal(190),
  z.literal(191),
  z.literal(192),
  z.literal(193),
  z.literal(194),
  z.literal(195),
  z.literal(196),
  z.literal(197),
  z.literal(198),
  z.literal(199),
  z.literal(200),
  z.literal(201),
  z.literal(202),
  z.literal(203),
  z.literal(204),
  z.literal(205),
  z.literal(206),
  z.literal(207),
  z.literal(208),
  z.literal(209),
  z.literal(210),
  z.literal(211),
  z.literal(212),
  z.literal(213),
  z.literal(214),
  z.literal(215),
  z.literal(216),
  z.literal(217),
  z.literal(218),
  z.literal(219),
  z.literal(220),
  z.literal(221),
  z.literal(222),
  z.literal(223),
  z.literal(224),
  z.literal(225),
  z.literal(226),
  z.literal(227),
  z.literal(228),
  z.literal(229),
  z.literal(230),
  z.literal(231),
  z.literal(232),
  z.literal(233),
  z.literal(234),
  z.literal(235),
  z.literal(236),
  z.literal(237),
  z.literal(238),
]);

export type HomeOwnerShipEnum = z.infer<typeof HomeOwnerShipEnum>;
export const HomeOwnerShipEnum = z.union([z.literal(1), z.literal(2), z.literal(3), z.literal(4)]);

export type IdTypeEnum = z.infer<typeof IdTypeEnum>;
export const IdTypeEnum = z.union([z.literal(1), z.literal(2), z.literal(3), z.literal(4), z.literal(5), z.literal(6)]);

export type VipCustomerEnum = z.infer<typeof VipCustomerEnum>;
export const VipCustomerEnum = z.union([z.literal(1), z.literal(2)]);

export type CustomerStatusCodeEnum = z.infer<typeof CustomerStatusCodeEnum>;
export const CustomerStatusCodeEnum = z.union([
  z.literal(1),
  z.literal(2),
  z.literal(3),
  z.literal(4),
  z.literal(5),
  z.literal(6),
  z.literal(7),
  z.literal(8),
]);

export type LockerHolderEnum = z.infer<typeof LockerHolderEnum>;
export const LockerHolderEnum = z.union([z.literal(1), z.literal(2)]);

export type TFNProvidedEnum = z.infer<typeof TFNProvidedEnum>;
export const TFNProvidedEnum = z.union([z.literal(0), z.literal(1)]);

export type EconomicCodeEnum = z.infer<typeof EconomicCodeEnum>;
export const EconomicCodeEnum = z.union([
  z.literal(1),
  z.literal(2),
  z.literal(3),
  z.literal(4),
  z.literal(5),
  z.literal(6),
]);

export type WithholdingTaxExeptionEnum = z.infer<typeof WithholdingTaxExeptionEnum>;
export const WithholdingTaxExeptionEnum = z.union([z.literal(1), z.literal(2)]);

export type IVRFlagEnum = z.infer<typeof IVRFlagEnum>;
export const IVRFlagEnum = z.union([z.literal(1), z.literal(2), z.literal(3)]);

export type ForeignIdTypeEnum = z.infer<typeof ForeignIdTypeEnum>;
export const ForeignIdTypeEnum = z.union([z.literal(1), z.literal(2), z.literal(3)]);

export type GenderEnum = z.infer<typeof GenderEnum>;
export const GenderEnum = z.union([z.literal(1), z.literal(2)]);

export type MaritalStatusEnum = z.infer<typeof MaritalStatusEnum>;
export const MaritalStatusEnum = z.union([z.literal(1), z.literal(2), z.literal(3), z.literal(4), z.literal(5)]);

export type CreateCustomerCommand = z.infer<typeof CreateCustomerCommand>;
export const CreateCustomerCommand = z.object({
  firstName: z.union([z.string(), z.null()]).optional(),
  lastName: z.union([z.string(), z.null()]).optional(),
  alley: z.union([z.string(), z.null()]).optional(),
  street: z.union([z.string(), z.null()]).optional(),
  village: z.union([z.string(), z.null()]).optional(),
  cityCode: z.union([z.string(), z.null()]).optional(),
  postalCode: z.union([z.string(), z.null()]).optional(),
  tellNo: z.union([z.string(), z.null()]).optional(),
  faxNo: z.union([z.string(), z.null()]).optional(),
  homeTel: z.union([z.string(), z.null()]).optional(),
  mobNo: z.union([z.string(), z.null()]).optional(),
  nationalityCode: NationalityCodeEnum.optional(),
  homeOwnership: HomeOwnerShipEnum.optional(),
  jobDetailCode: z.union([z.string(), z.null()]).optional(),
  idNumber: z.union([z.string(), z.null()]).optional(),
  birthDate: z.union([z.string(), z.null()]).optional(),
  issueDate: z.union([z.string(), z.null()]).optional(),
  idType: IdTypeEnum.optional(),
  vipCustomer: VipCustomerEnum.optional(),
  status: CustomerStatusCodeEnum.optional(),
  lockerHolder: LockerHolderEnum.optional(),
  tfnProvided: TFNProvidedEnum.optional(),
  group_AffliateCode: EconomicCodeEnum.optional(),
  middleName: z.union([z.string(), z.null()]).optional(),
  birthCertificateIssuingPlaceCode: z.union([z.string(), z.null()]).optional(),
  withholdingTaxExeption: WithholdingTaxExeptionEnum.optional(),
  ivrFlag: IVRFlagEnum.optional(),
  fatherName: z.union([z.string(), z.null()]).optional(),
  foreignIDType: ForeignIdTypeEnum.optional(),
  trackingNo: z.union([z.string(), z.null()]).optional(),
  gender: GenderEnum.optional(),
  maritalStatus: MaritalStatusEnum.optional(),
  idNo_PasportNo: z.union([z.string(), z.null()]).optional(),
  idSerialNo: z.union([z.string(), z.null()]).optional(),
  idSeries: z.union([z.string(), z.null()]).optional(),
  idSeriesHarf: z.union([z.string(), z.null()]).optional(),
  desiredHomeBranch: z.union([z.string(), z.null()]).optional(),
});

export type CreateCustomerStatusEnum = z.infer<typeof CreateCustomerStatusEnum>;
export const CreateCustomerStatusEnum = z.union([z.literal(1), z.literal(2), z.literal(3)]);

export type CreateCustomerOutputDto = z.infer<typeof CreateCustomerOutputDto>;
export const CreateCustomerOutputDto = z.object({
  customerNumber: z.number().optional(),
  customerStatusEnum: CreateCustomerStatusEnum.optional(),
});

export type CustomerInfoOutputDto = z.infer<typeof CustomerInfoOutputDto>;
export const CustomerInfoOutputDto = z.object({
  customerNo: z.number().optional(),
  customerType: z.union([z.string(), z.null()]).optional(),
  mobileNo: z.union([z.string(), z.null()]).optional(),
  firstName: z.union([z.string(), z.null()]).optional(),
  lastName: z.union([z.string(), z.null()]).optional(),
  nationalCode: z.union([z.string(), z.null()]).optional(),
  userName: z.union([z.string(), z.null()]).optional(),
  idType: z.union([z.string(), z.null()]).optional(),
  postalCode: z.union([z.string(), z.null()]).optional(),
  shahabNumber: z.union([z.string(), z.null()]).optional(),
  birthDate: z.union([z.string(), z.null()]).optional(),
});

export type CusRelateToAccOutputDto = z.infer<typeof CusRelateToAccOutputDto>;
export const CusRelateToAccOutputDto = z.object({
  accountNo: z.number().optional(),
  customers: z.union([z.array(CustomerInfoOutputDto), z.null()]).optional(),
});

export type CustomerAccountByCifFromMainMachineOutputDto = z.infer<typeof CustomerAccountByCifFromMainMachineOutputDto>;
export const CustomerAccountByCifFromMainMachineOutputDto = z.object({
  acc: z.union([z.string(), z.null()]).optional(),
  openStatus: z.union([z.string(), z.null()]).optional(),
  cheqbookF: z.union([z.string(), z.null()]).optional(),
  cardF: z.union([z.string(), z.null()]).optional(),
  accClass: z.union([z.string(), z.null()]).optional(),
  accTypeName: z.union([z.string(), z.null()]).optional(),
  currency: z.union([z.string(), z.null()]).optional(),
  isJoined: z.union([z.string(), z.null()]).optional(),
  accType: z.union([z.string(), z.null()]).optional(),
  accSubType: z.union([z.string(), z.null()]).optional(),
});

export type CustomerCardsQurey = z.infer<typeof CustomerCardsQurey>;
export const CustomerCardsQurey = z.object({
  customerNumber: z.number().optional(),
  channel: ChannelNameEnum.optional(),
  addDeletedCards: z.boolean().optional(),
});

export type CustomerCurrentAccountsWithoutTokenQuery = z.infer<typeof CustomerCurrentAccountsWithoutTokenQuery>;
export const CustomerCurrentAccountsWithoutTokenQuery = z.object({
  customerNumber: z.number().optional(),
  channel: ChannelNameEnum.optional(),
  addDeletedAccounts: z.boolean().optional(),
});

export type PersonTypeEnum = z.infer<typeof PersonTypeEnum>;
export const PersonTypeEnum = z.union([z.literal(1), z.literal(2), z.literal(3), z.literal(4)]);

export type FacilityAccountDto = z.infer<typeof FacilityAccountDto>;
export const FacilityAccountDto = z.object({
  accountNumber: z.number().optional(),
  openStatus: z.union([z.string(), z.null()]).optional(),
  accountTypeCode: z.union([z.string(), z.null()]).optional(),
  accountTypeName: z.union([z.string(), z.null()]).optional(),
  currencyType: z.union([z.string(), z.null()]).optional(),
  facilityType: FacilityRelationTypeEnum.optional(),
  accountSubType: z.union([z.string(), z.null()]).optional(),
  lastUpdate: z.string().optional(),
  counter: z.number().optional(),
  customerId: z.number().optional(),
});

export type UserLevelEnum = z.infer<typeof UserLevelEnum>;
export const UserLevelEnum = z.union([
  z.literal(1),
  z.literal(2),
  z.literal(4),
  z.literal(8),
  z.literal(16),
  z.literal(32),
]);

export type OSTypeEnum = z.infer<typeof OSTypeEnum>;
export const OSTypeEnum = z.union([z.literal(1), z.literal(2), z.literal(3), z.literal(4)]);

export type CustomerDeviceDto = z.infer<typeof CustomerDeviceDto>;
export const CustomerDeviceDto = z.object({
  userLevel: UserLevelEnum.optional(),
  channel: ChannelNameEnum.optional(),
  deviceId: z.union([z.string(), z.null()]).optional(),
  osVersion: z.union([z.string(), z.null()]).optional(),
  osType: OSTypeEnum.optional(),
  customerId: z.number().optional(),
});

export type RelationStatusEnum = z.infer<typeof RelationStatusEnum>;
export const RelationStatusEnum = z.union([z.literal(0), z.literal(9)]);

export type RelatedAccountDto = z.infer<typeof RelatedAccountDto>;
export const RelatedAccountDto = z.object({
  accountNumber: z.number().optional(),
  relationType: RelationTypeEnum.optional(),
  status: RelationStatusEnum.optional(),
  percent: z.number().optional(),
  startDate: z.union([z.string(), z.null()]).optional(),
  endDate: z.union([z.string(), z.null()]).optional(),
  lastUpdate: z.string().optional(),
  counter: z.number().optional(),
  customerId: z.number().optional(),
});

export type CustomerDetailOutputDto = z.infer<typeof CustomerDetailOutputDto>;
export const CustomerDetailOutputDto = z.object({
  userName: z.union([z.string(), z.null()]).optional(),
  mobileNumber: z.union([z.string(), z.null()]).optional(),
  nationalCode: z.union([z.string(), z.null()]).optional(),
  customerNo: z.number().optional(),
  shahabNo: z.number().optional(),
  firstName: z.union([z.string(), z.null()]).optional(),
  lastName: z.union([z.string(), z.null()]).optional(),
  customerType: PersonTypeEnum.optional(),
  birthDate: z.union([z.string(), z.null()]).optional(),
  hashCode: z.union([z.string(), z.null()]).optional(),
  shahkarConfirm: z.boolean().optional(),
  accounts: z.union([z.array(AccountDto), z.null()]).optional(),
  cards: z.union([z.array(CardDto), z.null()]).optional(),
  facilityAccounts: z.union([z.array(FacilityAccountDto), z.null()]).optional(),
  devices: z.union([z.array(CustomerDeviceDto), z.null()]).optional(),
  relatedAccounts: z.union([z.array(RelatedAccountDto), z.null()]).optional(),
});

export type CustomerInfoForDeactivateOutputDto = z.infer<typeof CustomerInfoForDeactivateOutputDto>;
export const CustomerInfoForDeactivateOutputDto = z.object({
  maskedMobileNumber: z.union([z.string(), z.null()]).optional(),
  keyToken: z.union([z.string(), z.null()]).optional(),
  isNationalCodeRequired: z.boolean().optional(),
});

export type CustomerInfoTokenOutputDto = z.infer<typeof CustomerInfoTokenOutputDto>;
export const CustomerInfoTokenOutputDto = z.object({
  token: z.union([z.string(), z.null()]).optional(),
});

export type CustomerOnlineAccountsQuery = z.infer<typeof CustomerOnlineAccountsQuery>;
export const CustomerOnlineAccountsQuery = z.object({
  customerNumber: z.number().optional(),
});

export type CustomerOutputDto = z.infer<typeof CustomerOutputDto>;
export const CustomerOutputDto = z.object({
  id: z.number().optional(),
  userName: z.union([z.string(), z.null()]).optional(),
  mobileNumber: z.union([z.string(), z.null()]).optional(),
  nationalCode: z.union([z.string(), z.null()]).optional(),
  customerNo: z.number().optional(),
  shahabNo: z.number().optional(),
  firstName: z.union([z.string(), z.null()]).optional(),
  lastName: z.union([z.string(), z.null()]).optional(),
  customerType: PersonTypeEnum.optional(),
  birthDate: z.union([z.string(), z.null()]).optional(),
  hashCode: z.union([z.string(), z.null()]).optional(),
  shahkarConfirm: z.boolean().optional(),
  createdUtc: z.string().optional(),
  lastModifiedUtc: z.union([z.string(), z.null()]).optional(),
});

export type PagedListMetaData = z.infer<typeof PagedListMetaData>;
export const PagedListMetaData = z.object({
  pageSize: z.number().optional(),
  currentPage: z.number().optional(),
  totalPages: z.number().optional(),
  totalCount: z.number().optional(),
  hasPrevious: z.boolean().optional(),
  hasNext: z.boolean().optional(),
  hasPages: z.boolean().optional(),
});

export type CustomerOutputDtoPagedListDto = z.infer<typeof CustomerOutputDtoPagedListDto>;
export const CustomerOutputDtoPagedListDto = z.object({
  items: z.union([z.array(CustomerOutputDto), z.null()]).optional(),
  metaData: PagedListMetaData.optional(),
});

export type CustomerTotalInfoBySSNOutputDto = z.infer<typeof CustomerTotalInfoBySSNOutputDto>;
export const CustomerTotalInfoBySSNOutputDto = z.object({
  customerNo: z.union([z.string(), z.null()]).optional(),
  shahabNumber: z.union([z.string(), z.null()]).optional(),
  customerType: PersonTypeEnum.optional(),
  firstName: z.union([z.string(), z.null()]).optional(),
  lastName: z.union([z.string(), z.null()]).optional(),
  fatherName: z.union([z.string(), z.null()]).optional(),
  customerPostalCode: z.union([z.string(), z.null()]).optional(),
  customerTel: z.union([z.string(), z.null()]).optional(),
  idNumber: z.union([z.string(), z.null()]).optional(),
  certificateId: z.union([z.string(), z.null()]).optional(),
  bornDate: z.union([z.string(), z.null()]).optional(),
  provinceCode: z.union([z.string(), z.null()]).optional(),
  idType: z.union([z.string(), z.null()]).optional(),
  shahabStat: z.union([z.string(), z.null()]).optional(),
  customerStatus: z.union([z.string(), z.null()]).optional(),
  identityIssuePlace: z.union([z.string(), z.null()]).optional(),
  identityIssueDate: z.union([z.string(), z.null()]).optional(),
  address: z.union([z.string(), z.null()]).optional(),
  phoneNoRes: z.union([z.string(), z.null()]).optional(),
});

export type CustomerTotalInfoOutputDto = z.infer<typeof CustomerTotalInfoOutputDto>;
export const CustomerTotalInfoOutputDto = z.object({
  customerNo: z.union([z.string(), z.null()]).optional(),
  shahabNumber: z.union([z.string(), z.null()]).optional(),
  customerType: z.union([z.string(), z.null()]).optional(),
  firstName: z.union([z.string(), z.null()]).optional(),
  lastName: z.union([z.string(), z.null()]).optional(),
  fatherName: z.union([z.string(), z.null()]).optional(),
  customerPostalCode: z.union([z.string(), z.null()]).optional(),
  customerTel: z.union([z.string(), z.null()]).optional(),
  idNumber: z.union([z.string(), z.null()]).optional(),
  certificateId: z.union([z.string(), z.null()]).optional(),
  bornDate: z.union([z.string(), z.null()]).optional(),
  provinceCode: z.union([z.string(), z.null()]).optional(),
  idType: z.union([z.string(), z.null()]).optional(),
  shahabStat: z.union([z.string(), z.null()]).optional(),
  customerStatus: z.union([z.string(), z.null()]).optional(),
  identityIssuePlace: z.union([z.string(), z.null()]).optional(),
  identityIssueDate: z.union([z.string(), z.null()]).optional(),
  address: z.union([z.string(), z.null()]).optional(),
  phoneNoRes: z.union([z.string(), z.null()]).optional(),
});

export type DeactivateAllChannelCommand = z.infer<typeof DeactivateAllChannelCommand>;
export const DeactivateAllChannelCommand = z.object({
  keyToken: z.union([z.string(), z.null()]).optional(),
  otpCode: z.union([z.string(), z.null()]).optional(),
});

export type DeactivateAllOutputDto = z.infer<typeof DeactivateAllOutputDto>;
export const DeactivateAllOutputDto = z.object({
  successMessage: z.union([z.string(), z.null()]).optional(),
});

export type DeactivateOtpOutputDto = z.infer<typeof DeactivateOtpOutputDto>;
export const DeactivateOtpOutputDto = z.object({
  lifeTime: z.number().optional(),
  codeLength: z.number().optional(),
  message: z.union([z.string(), z.null()]).optional(),
});

export type DeleteAccountCommand = z.infer<typeof DeleteAccountCommand>;
export const DeleteAccountCommand = z.object({
  accountNumber: z.number().optional(),
});

export type DeleteCardCommand = z.infer<typeof DeleteCardCommand>;
export const DeleteCardCommand = z.object({
  cardNumber: z.number().optional(),
});

export type DeleteSettingCommand = z.infer<typeof DeleteSettingCommand>;
export const DeleteSettingCommand = z.object({
  key: z.union([z.string(), z.null()]).optional(),
});

export type DeleteSettingDraftCommand = z.infer<typeof DeleteSettingDraftCommand>;
export const DeleteSettingDraftCommand = z.object({
  key: z.union([z.string(), z.null()]).optional(),
});

export type DeviceValidationIBOutputDto = z.infer<typeof DeviceValidationIBOutputDto>;
export const DeviceValidationIBOutputDto = z.object({
  userName: z.union([z.string(), z.null()]).optional(),
  deviceId: z.union([z.string(), z.null()]).optional(),
  userLevelEnum: UserLevelEnum.optional(),
});

export type DeviceValidationIBQuery = z.infer<typeof DeviceValidationIBQuery>;
export const DeviceValidationIBQuery = z.object({
  username: z.union([z.string(), z.null()]).optional(),
  deviceId: z.union([z.string(), z.null()]).optional(),
});

export type DeviceValidationOutputDto = z.infer<typeof DeviceValidationOutputDto>;
export const DeviceValidationOutputDto = z.object({
  deviceId: z.union([z.string(), z.null()]).optional(),
  userLevelEnum: UserLevelEnum.optional(),
});

export type DeviceValidationQuery = z.infer<typeof DeviceValidationQuery>;
export const DeviceValidationQuery = z.object({
  username: z.union([z.string(), z.null()]).optional(),
  deviceId: z.union([z.string(), z.null()]).optional(),
});

export type EditSettingDraftCommand = z.infer<typeof EditSettingDraftCommand>;
export const EditSettingDraftCommand = z.object({
  key: z.union([z.string(), z.null()]).optional(),
  value: z.union([z.string(), z.null()]).optional(),
  isAppSetting: z.boolean().optional(),
});

export type FrequentlyDataUsedCategory = z.infer<typeof FrequentlyDataUsedCategory>;
export const FrequentlyDataUsedCategory = z.union([
  z.literal(1),
  z.literal(2),
  z.literal(3),
  z.literal(4),
  z.literal(5),
  z.literal(6),
  z.literal(7),
  z.literal(8),
]);

export type FrequentlyDataUsedType = z.infer<typeof FrequentlyDataUsedType>;
export const FrequentlyDataUsedType = z.union([z.literal(0), z.literal(1), z.literal(2), z.literal(3)]);

export type FrequentlyDatasRemoveCommand = z.infer<typeof FrequentlyDatasRemoveCommand>;
export const FrequentlyDatasRemoveCommand = z.object({
  value: z.union([z.string(), z.null()]).optional(),
  category: FrequentlyDataUsedCategory.optional(),
  forAll: z.boolean().optional(),
});

export type FrequentlyUsedSource = z.infer<typeof FrequentlyUsedSource>;
export const FrequentlyUsedSource = z.object({
  value: z.union([z.string(), z.null()]).optional(),
  title: z.union([z.string(), z.null()]).optional(),
  counter: z.number().optional(),
});

export type GetAccountsBySignGrantedInternalQuery = z.infer<typeof GetAccountsBySignGrantedInternalQuery>;
export const GetAccountsBySignGrantedInternalQuery = z.object({
  customerNumber: z.number().optional(),
});

export type GetBanRuleActorLevelsOutputDto = z.infer<typeof GetBanRuleActorLevelsOutputDto>;
export const GetBanRuleActorLevelsOutputDto = z.object({
  id: z.number().optional(),
  username: z.union([z.string(), z.null()]).optional(),
  actorLevel: BanRuleActorLevelEnum.optional(),
});

export type GetBanRuleActorLevelsOutputDtoPagedListDto = z.infer<typeof GetBanRuleActorLevelsOutputDtoPagedListDto>;
export const GetBanRuleActorLevelsOutputDtoPagedListDto = z.object({
  items: z.union([z.array(GetBanRuleActorLevelsOutputDto), z.null()]).optional(),
  metaData: PagedListMetaData.optional(),
});

export type QueryBuilderFilterRule = {
  condition?: string | null;
  field?: string | null;
  id?: string | null;
  input?: string | null;
  operator?: string | null;
  rules?: Array<QueryBuilderFilterRule> | null;
  type?: string | null;
  value?: Array<string> | null;
};
export const QueryBuilderFilterRule: z.ZodType<QueryBuilderFilterRule> = z.lazy(() =>
  z.object({
    condition: z.union([z.string(), z.null()]).optional(),
    field: z.union([z.string(), z.null()]).optional(),
    id: z.union([z.string(), z.null()]).optional(),
    input: z.union([z.string(), z.null()]).optional(),
    operator: z.union([z.string(), z.null()]).optional(),
    rules: z.union([z.array(QueryBuilderFilterRule), z.null()]).optional(),
    type: z.union([z.string(), z.null()]).optional(),
    value: z.union([z.array(z.string()), z.null()]).optional(),
  }),
);
export type GetBanRuleActorLevelsQuery = z.infer<typeof GetBanRuleActorLevelsQuery>;
export const GetBanRuleActorLevelsQuery = z.object({
  filter: QueryBuilderFilterRule.optional(),
  sort: z.union([z.string(), z.null()]).optional(),
  pageNumber: z.number().optional(),
  pageSize: z.number().optional(),
});

export type GetBanRulePersonsOutputDto = z.infer<typeof GetBanRulePersonsOutputDto>;
export const GetBanRulePersonsOutputDto = z.object({
  id: z.number().optional(),
  nationalID: z.union([z.string(), z.null()]).optional(),
  startTimeUtc: z.union([z.string(), z.null()]).optional(),
  endTimeUtc: z.union([z.string(), z.null()]).optional(),
  isDeleted: z.boolean().optional(),
  banRuleActorLevel: BanRuleActorLevelEnum.optional(),
  description: z.union([z.string(), z.null()]).optional(),
  deleteDescription: z.union([z.string(), z.null()]).optional(),
  createdById: z.number().optional(),
  createdBy: z.union([z.string(), z.null()]).optional(),
  createdUtc: z.string().optional(),
  lastModifiedById: z.union([z.number(), z.null()]).optional(),
  lastModifiedBy: z.union([z.string(), z.null()]).optional(),
  lastModifiedUtc: z.union([z.string(), z.null()]).optional(),
});

export type GetBanRulePersonsOutputDtoPagedListDto = z.infer<typeof GetBanRulePersonsOutputDtoPagedListDto>;
export const GetBanRulePersonsOutputDtoPagedListDto = z.object({
  items: z.union([z.array(GetBanRulePersonsOutputDto), z.null()]).optional(),
  metaData: PagedListMetaData.optional(),
});

export type GetBanRulePersonsQuery = z.infer<typeof GetBanRulePersonsQuery>;
export const GetBanRulePersonsQuery = z.object({
  filter: QueryBuilderFilterRule.optional(),
  sort: z.union([z.string(), z.null()]).optional(),
  pageNumber: z.number().optional(),
  pageSize: z.number().optional(),
});

export type GetBanRulesQuery = z.infer<typeof GetBanRulesQuery>;
export const GetBanRulesQuery = z.object({
  filter: QueryBuilderFilterRule.optional(),
  sort: z.union([z.string(), z.null()]).optional(),
  pageNumber: z.number().optional(),
  pageSize: z.number().optional(),
});

export type GetCitiesQuery = z.infer<typeof GetCitiesQuery>;
export const GetCitiesQuery = z.unknown();

export type GetCustomerAddressOutputDto = z.infer<typeof GetCustomerAddressOutputDto>;
export const GetCustomerAddressOutputDto = z.object({
  address: z.union([z.string(), z.null()]).optional(),
});

export type GetCustomerDetailForAdminQuery = z.infer<typeof GetCustomerDetailForAdminQuery>;
export const GetCustomerDetailForAdminQuery = z.object({
  id: z.number().optional(),
});

export type GetCustomerForDeactivateQuery = z.infer<typeof GetCustomerForDeactivateQuery>;
export const GetCustomerForDeactivateQuery = z.object({
  accountOrCardNumber: z.union([z.string(), z.null()]).optional(),
});

export type GetCustomersForAdminQuery = z.infer<typeof GetCustomersForAdminQuery>;
export const GetCustomersForAdminQuery = z.object({
  filter: QueryBuilderFilterRule.optional(),
  sort: z.union([z.string(), z.null()]).optional(),
  pageNumber: z.number().optional(),
  pageSize: z.number().optional(),
});

export type GetCustomersRelatedToAccountQuery = z.infer<typeof GetCustomersRelatedToAccountQuery>;
export const GetCustomersRelatedToAccountQuery = z.object({
  accounts: z.union([z.array(z.number()), z.null()]).optional(),
});

export type GetFrequentlyUsedData = z.infer<typeof GetFrequentlyUsedData>;
export const GetFrequentlyUsedData = z.object({
  value: z.union([z.string(), z.null()]).optional(),
  category: FrequentlyDataUsedCategory.optional(),
  type: FrequentlyDataUsedType.optional(),
  title: z.union([z.string(), z.null()]).optional(),
  counter: z.number().optional(),
});

export type GetFrequentlyUsedDataOutputDto = z.infer<typeof GetFrequentlyUsedDataOutputDto>;
export const GetFrequentlyUsedDataOutputDto = z.object({
  upsertedData: z.union([z.array(GetFrequentlyUsedData), z.null()]).optional(),
  deletedData: z.union([z.array(GetFrequentlyUsedData), z.null()]).optional(),
  token: z.union([z.string(), z.null()]).optional(),
});

export type GetFrequentlyUsedDataQuery = z.infer<typeof GetFrequentlyUsedDataQuery>;
export const GetFrequentlyUsedDataQuery = z.object({
  lastToken: z.number().optional(),
});

export type GetFrequentlyUsedSourcesOutputDto = z.infer<typeof GetFrequentlyUsedSourcesOutputDto>;
export const GetFrequentlyUsedSourcesOutputDto = z.object({
  datas: z.union([z.array(FrequentlyUsedSource), z.null()]).optional(),
});

export type GetHealthStatusOutputDto = z.infer<typeof GetHealthStatusOutputDto>;
export const GetHealthStatusOutputDto = z.object({
  readDatabaseOK: z.number().optional(),
  readDatabaseTime: z.number().optional(),
  writeDatabaseOK: z.number().optional(),
  writeDatabaseTime: z.number().optional(),
  readRedisOK: z.number().optional(),
  readRedisTime: z.number().optional(),
  writeRedisOK: z.number().optional(),
  writeRedisTime: z.number().optional(),
  removeRedisOK: z.number().optional(),
  removeRedisTime: z.number().optional(),
  channelOK: z.number().optional(),
  channelTime: z.number().optional(),
  identityOK: z.number().optional(),
  identityTime: z.number().optional(),
  cardOperationsOK: z.number().optional(),
  cardOperationsTime: z.number().optional(),
  otpManagementOK: z.number().optional(),
  otpManagementTime: z.number().optional(),
});

export type GetNationalCodeOutputDto = z.infer<typeof GetNationalCodeOutputDto>;
export const GetNationalCodeOutputDto = z.object({
  maskedMobileNumber: z.union([z.string(), z.null()]).optional(),
  keyToken: z.union([z.string(), z.null()]).optional(),
});

export type GetNationalCodeQuery = z.infer<typeof GetNationalCodeQuery>;
export const GetNationalCodeQuery = z.object({
  nationalCode: z.union([z.string(), z.null()]).optional(),
  keyToken: z.union([z.string(), z.null()]).optional(),
});

export type GetPersonBanRuleListOutputDto = z.infer<typeof GetPersonBanRuleListOutputDto>;
export const GetPersonBanRuleListOutputDto = z.object({
  id: z.number().optional(),
  nationalID: z.union([z.string(), z.null()]).optional(),
  startTimeUtc: z.union([z.string(), z.null()]).optional(),
  endTimeUtc: z.union([z.string(), z.null()]).optional(),
  banRuleActorLevel: BanRuleActorLevelEnum.optional(),
  description: z.union([z.string(), z.null()]).optional(),
});

export type GetScheduledTasksArchiveQuery = z.infer<typeof GetScheduledTasksArchiveQuery>;
export const GetScheduledTasksArchiveQuery = z.object({
  filter: QueryBuilderFilterRule.optional(),
  sort: z.union([z.string(), z.null()]).optional(),
  pageNumber: z.number().optional(),
  pageSize: z.number().optional(),
});

export type GetScheduledTasksQuery = z.infer<typeof GetScheduledTasksQuery>;
export const GetScheduledTasksQuery = z.object({
  filter: QueryBuilderFilterRule.optional(),
  sort: z.union([z.string(), z.null()]).optional(),
  pageNumber: z.number().optional(),
  pageSize: z.number().optional(),
});

export type GetSettingDraftsDto = z.infer<typeof GetSettingDraftsDto>;
export const GetSettingDraftsDto = z.object({
  id: z.number().optional(),
  key: z.union([z.string(), z.null()]).optional(),
  value: z.union([z.string(), z.null()]).optional(),
  isAppSetting: z.boolean().optional(),
  actionType: ActionTypeEnum.optional(),
  createdById: z.union([z.number(), z.null()]).optional(),
  createdUtc: z.string().optional(),
  lastModifiedById: z.union([z.number(), z.null()]).optional(),
  lastModifiedUtc: z.union([z.string(), z.null()]).optional(),
});

export type GetSettingDraftsDtoPagedListDto = z.infer<typeof GetSettingDraftsDtoPagedListDto>;
export const GetSettingDraftsDtoPagedListDto = z.object({
  items: z.union([z.array(GetSettingDraftsDto), z.null()]).optional(),
  metaData: PagedListMetaData.optional(),
});

export type GetSettingDraftsQuery = z.infer<typeof GetSettingDraftsQuery>;
export const GetSettingDraftsQuery = z.object({
  filter: QueryBuilderFilterRule.optional(),
  sort: z.union([z.string(), z.null()]).optional(),
  pageNumber: z.number().optional(),
  pageSize: z.number().optional(),
});

export type GetSettingDto = z.infer<typeof GetSettingDto>;
export const GetSettingDto = z.object({
  key: z.union([z.string(), z.null()]).optional(),
  value: z.union([z.string(), z.null()]).optional(),
  isAppSetting: z.boolean().optional(),
  createdById: z.union([z.number(), z.null()]).optional(),
  createdUtc: z.string().optional(),
  lastModifiedById: z.union([z.number(), z.null()]).optional(),
  lastModifiedUtc: z.union([z.string(), z.null()]).optional(),
});

export type GetSettingDtoPagedListDto = z.infer<typeof GetSettingDtoPagedListDto>;
export const GetSettingDtoPagedListDto = z.object({
  items: z.union([z.array(GetSettingDto), z.null()]).optional(),
  metaData: PagedListMetaData.optional(),
});

export type GetSettingsQuery = z.infer<typeof GetSettingsQuery>;
export const GetSettingsQuery = z.object({
  filter: QueryBuilderFilterRule.optional(),
  sort: z.union([z.string(), z.null()]).optional(),
  pageNumber: z.number().optional(),
  pageSize: z.number().optional(),
});

export type UserType = z.infer<typeof UserType>;
export const UserType = z.union([z.literal(0), z.literal(1)]);

export type GetSpecificClaimUsersOutputDto = z.infer<typeof GetSpecificClaimUsersOutputDto>;
export const GetSpecificClaimUsersOutputDto = z.object({
  id: z.number().optional(),
  userName: z.union([z.string(), z.null()]).optional(),
  email: z.union([z.string(), z.null()]).optional(),
  firstName: z.union([z.string(), z.null()]).optional(),
  lastName: z.union([z.string(), z.null()]).optional(),
  userType: UserType.optional(),
});

export type GetSpecificClaimUsersOutputDtoPagedListDto = z.infer<typeof GetSpecificClaimUsersOutputDtoPagedListDto>;
export const GetSpecificClaimUsersOutputDtoPagedListDto = z.object({
  items: z.union([z.array(GetSpecificClaimUsersOutputDto), z.null()]).optional(),
  metaData: PagedListMetaData.optional(),
});

export type GetSpecificClaimUsersQuery = z.infer<typeof GetSpecificClaimUsersQuery>;
export const GetSpecificClaimUsersQuery = z.object({
  claimName: z.union([z.string(), z.null()]).optional(),
  claimValue: z.union([z.string(), z.null()]).optional(),
  sort: z.union([z.string(), z.null()]).optional(),
  pageNumber: z.number().optional(),
  pageSize: z.number().optional(),
});

export type GetTokenQuery = z.infer<typeof GetTokenQuery>;
export const GetTokenQuery = z.object({
  audience: z.union([z.string(), z.null()]).optional(),
});

export type GetUserProfilesOutputDto = z.infer<typeof GetUserProfilesOutputDto>;
export const GetUserProfilesOutputDto = z.object({
  profiles: z.union([z.unknown(), z.null()]).optional(),
});

export type GetUserSettingsOutputDto = z.infer<typeof GetUserSettingsOutputDto>;
export const GetUserSettingsOutputDto = z.object({
  lastGetToken: z.number().optional(),
  settings: z.union([z.unknown(), z.null()]).optional(),
});

export type HarimForLevelTwoAuthCommand = z.infer<typeof HarimForLevelTwoAuthCommand>;
export const HarimForLevelTwoAuthCommand = z.object({
  cardNumber: z.number().optional(),
  tokenForLevelTwo: z.union([z.string(), z.null()]).optional(),
});

export type HarimForLevelTwoAuthOutputDto = z.infer<typeof HarimForLevelTwoAuthOutputDto>;
export const HarimForLevelTwoAuthOutputDto = z.object({
  message: z.union([z.string(), z.null()]).optional(),
  lifeTime: z.number().optional(),
  codeLength: z.number().optional(),
});

export type IBCreateUserCommand = z.infer<typeof IBCreateUserCommand>;
export const IBCreateUserCommand = z.object({
  customerNumber: z.number().optional(),
  nationalCode: z.union([z.string(), z.null()]).optional(),
});

export type IBCreateUserOutputDto = z.infer<typeof IBCreateUserOutputDto>;
export const IBCreateUserOutputDto = z.object({
  customerNumber: z.number().optional(),
  nationalCode: z.union([z.string(), z.null()]).optional(),
  userName: z.union([z.string(), z.null()]).optional(),
});

export type IncreaseFrequentlyUsedDataUsageCommand = z.infer<typeof IncreaseFrequentlyUsedDataUsageCommand>;
export const IncreaseFrequentlyUsedDataUsageCommand = z.object({
  category: FrequentlyDataUsedCategory.optional(),
  userId: z.number().optional(),
  channel: ChannelNameEnum.optional(),
  value: z.union([z.string(), z.null()]).optional(),
});

export type InquiryNahabOutputDto = z.infer<typeof InquiryNahabOutputDto>;
export const InquiryNahabOutputDto = z.object({
  message: z.union([z.string(), z.null()]).optional(),
});

export type InquiryNahabQuery = z.infer<typeof InquiryNahabQuery>;
export const InquiryNahabQuery = z.object({
  cif: z.number().optional(),
});

export type InquiryPresenterCodeOutputDto = z.infer<typeof InquiryPresenterCodeOutputDto>;
export const InquiryPresenterCodeOutputDto = z.object({
  isValid: z.boolean().optional(),
});

export type InquiryPresenterCodeQuery = z.infer<typeof InquiryPresenterCodeQuery>;
export const InquiryPresenterCodeQuery = z.object({
  presenterCode: z.union([z.string(), z.null()]).optional(),
});

export type InternalUpdateCardCommand = z.infer<typeof InternalUpdateCardCommand>;
export const InternalUpdateCardCommand = z.object({
  customerNumber: z.number().optional(),
});

export type IsCustomerOwnerOfAccountQuery = z.infer<typeof IsCustomerOwnerOfAccountQuery>;
export const IsCustomerOwnerOfAccountQuery = z.object({
  customerNo: z.number().optional(),
  accountNo: z.number().optional(),
});

export type IsLegalRelatedCustomerRelationExistOutputDto = z.infer<typeof IsLegalRelatedCustomerRelationExistOutputDto>;
export const IsLegalRelatedCustomerRelationExistOutputDto = z.object({
  isRelationExist: z.boolean().optional(),
});

export type IsLegalRelatedCustomerRelationExistQuery = z.infer<typeof IsLegalRelatedCustomerRelationExistQuery>;
export const IsLegalRelatedCustomerRelationExistQuery = z.object({
  signGrantedCustomerNumber: z.number().optional(),
  legalRelatedCustomerNumber: z.number().optional(),
});

export type LegalRelatedCustomerOutputDto = z.infer<typeof LegalRelatedCustomerOutputDto>;
export const LegalRelatedCustomerOutputDto = z.object({
  customerNumber: z.number().optional(),
  nationalId: z.union([z.string(), z.null()]).optional(),
  fullName: z.union([z.string(), z.null()]).optional(),
});

export type MobileMatchCommand = z.infer<typeof MobileMatchCommand>;
export const MobileMatchCommand = z.object({
  mobileNumber: z.union([z.string(), z.null()]).optional(),
  keyToken: z.union([z.string(), z.null()]).optional(),
});

export type MobileMatchOutputDto = z.infer<typeof MobileMatchOutputDto>;
export const MobileMatchOutputDto = z.object({
  isMatched: z.boolean().optional(),
  keyToken: z.union([z.string(), z.null()]).optional(),
});

export type OnlineAccountOutputDto = z.infer<typeof OnlineAccountOutputDto>;
export const OnlineAccountOutputDto = z.object({
  accountNumber: z.number().optional(),
  customerNumber: z.number().optional(),
  ownPercent: z.union([z.string(), z.null()]).optional(),
  accountTypeCode: z.union([z.string(), z.null()]).optional(),
  currencyType: z.union([z.string(), z.null()]).optional(),
  accountStatusCode: z.union([z.string(), z.null()]).optional(),
  intCat: z.union([z.string(), z.null()]).optional(),
  accountTypeName: z.union([z.string(), z.null()]).optional(),
  ownersCount: z.number().optional(),
});

export type PreRegisterCommand = z.infer<typeof PreRegisterCommand>;
export const PreRegisterCommand = z.object({
  accOrCifNum: z.union([z.string(), z.null()]).optional(),
  nationalCode: z.union([z.string(), z.null()]).optional(),
  birthDate: z.union([z.string(), z.null()]).optional(),
  smsHashCode: z.union([z.string(), z.null()]).optional(),
});

export type SendOTPTypeEnum = z.infer<typeof SendOTPTypeEnum>;
export const SendOTPTypeEnum = z.union([z.literal(1), z.literal(2)]);

export type PreRegisterOutputDto = z.infer<typeof PreRegisterOutputDto>;
export const PreRegisterOutputDto = z.object({
  lifeTime: z.number().optional(),
  codeLength: z.number().optional(),
  message: z.union([z.string(), z.null()]).optional(),
  otpType: SendOTPTypeEnum.optional(),
});

export type PresentCodeOutputDto = z.infer<typeof PresentCodeOutputDto>;
export const PresentCodeOutputDto = z.object({
  presentCode: z.union([z.string(), z.null()]).optional(),
});

export type RegisterCommand = z.infer<typeof RegisterCommand>;
export const RegisterCommand = z.object({
  password: z.union([z.string(), z.null()]).optional(),
  confirmPassword: z.union([z.string(), z.null()]).optional(),
  preservePreviousPassword: z.boolean().optional(),
  keyToken: z.union([z.string(), z.null()]).optional(),
  presenterCode: z.union([z.string(), z.null()]).optional(),
});

export type RegisterIBCommand = z.infer<typeof RegisterIBCommand>;
export const RegisterIBCommand = z.object({
  password: z.union([z.string(), z.null()]).optional(),
  confirmPassword: z.union([z.string(), z.null()]).optional(),
  preservePreviousPassword: z.boolean().optional(),
  keyToken: z.union([z.string(), z.null()]).optional(),
  presenterCode: z.union([z.string(), z.null()]).optional(),
});

export type RegisterOutputDto = z.infer<typeof RegisterOutputDto>;
export const RegisterOutputDto = z.object({
  userName: z.union([z.string(), z.null()]).optional(),
  tokenForLevelTwo: z.union([z.string(), z.null()]).optional(),
});

export type RejectSettingDraftCommand = z.infer<typeof RejectSettingDraftCommand>;
export const RejectSettingDraftCommand = z.object({
  draftId: z.number().optional(),
});

export type RelatedCustomerOutputDto = z.infer<typeof RelatedCustomerOutputDto>;
export const RelatedCustomerOutputDto = z.object({
  customerNumber: z.number().optional(),
  fullName: z.union([z.string(), z.null()]).optional(),
});

export type RemoveBanRuleActorLevelCommand = z.infer<typeof RemoveBanRuleActorLevelCommand>;
export const RemoveBanRuleActorLevelCommand = z.object({
  id: z.number().optional(),
});

export type RemoveBanRuleCommand = z.infer<typeof RemoveBanRuleCommand>;
export const RemoveBanRuleCommand = z.object({
  banRuleId: z.number().optional(),
});

export type RemoveBanRulePersonCommand = z.infer<typeof RemoveBanRulePersonCommand>;
export const RemoveBanRulePersonCommand = z.object({
  id: z.number().optional(),
  deleteDescription: z.union([z.string(), z.null()]).optional(),
});

export type RemoveCityCommand = z.infer<typeof RemoveCityCommand>;
export const RemoveCityCommand = z.object({
  id: z.number().optional(),
});

export type RemoveOrganizationClaimsForUserCommand = z.infer<typeof RemoveOrganizationClaimsForUserCommand>;
export const RemoveOrganizationClaimsForUserCommand = z.object({
  nationalCode: z.union([z.string(), z.null()]).optional(),
  organizationId: z.number().optional(),
  organizationUnitId: z.number().optional(),
});

export type RequestRegisterZeroLevelCommand = z.infer<typeof RequestRegisterZeroLevelCommand>;
export const RequestRegisterZeroLevelCommand = z.object({
  nationalCode: z.union([z.string(), z.null()]).optional(),
  mobileNumber: z.union([z.string(), z.null()]).optional(),
  birthDate: z.union([z.string(), z.null()]).optional(),
});

export type RequestRegisterZeroLevelOutputDto = z.infer<typeof RequestRegisterZeroLevelOutputDto>;
export const RequestRegisterZeroLevelOutputDto = z.object({
  keyToken: z.union([z.string(), z.null()]).optional(),
  message: z.union([z.string(), z.null()]).optional(),
  lifeTime: z.number().optional(),
  codeLength: z.number().optional(),
});

export type RequestUpgradeForLevelTwoCommand = z.infer<typeof RequestUpgradeForLevelTwoCommand>;
export const RequestUpgradeForLevelTwoCommand = z.object({
  cardNumber: z.number().optional(),
});

export type RequestUpgradeForLevelTwoOutputDto = z.infer<typeof RequestUpgradeForLevelTwoOutputDto>;
export const RequestUpgradeForLevelTwoOutputDto = z.object({
  message: z.union([z.string(), z.null()]).optional(),
  lifeTime: z.number().optional(),
  codeLength: z.number().optional(),
});

export type SabtAhvalInquiryOutputDto = z.infer<typeof SabtAhvalInquiryOutputDto>;
export const SabtAhvalInquiryOutputDto = z.object({
  firstName: z.union([z.string(), z.null()]).optional(),
  lastName: z.union([z.string(), z.null()]).optional(),
  deathStatus: z.boolean().optional(),
  birthDate: z.union([z.string(), z.null()]).optional(),
  deathDate: z.union([z.string(), z.null()]).optional(),
});

export type SabtAhvalInquiryQuery = z.infer<typeof SabtAhvalInquiryQuery>;
export const SabtAhvalInquiryQuery = z.object({
  nationalCode: z.union([z.string(), z.null()]).optional(),
  birthDate: z.union([z.string(), z.null()]).optional(),
});

export type SanaStatusEnum = z.infer<typeof SanaStatusEnum>;
export const SanaStatusEnum = z.union([z.literal(0), z.literal(1), z.literal(2)]);

export type SanaInquiryOutputDto = z.infer<typeof SanaInquiryOutputDto>;
export const SanaInquiryOutputDto = z.object({
  sanaStatus: SanaStatusEnum.optional(),
});

export type SanaInquiryQuery = z.infer<typeof SanaInquiryQuery>;
export const SanaInquiryQuery = z.object({
  personType: PersonTypeEnum.optional(),
  nationalCode: z.union([z.string(), z.null()]).optional(),
});

export type SaveDestinationAccountCommand = z.infer<typeof SaveDestinationAccountCommand>;
export const SaveDestinationAccountCommand = z.object({
  accountNumber: z.number().optional(),
});

export type SaveDestinationCardCommand = z.infer<typeof SaveDestinationCardCommand>;
export const SaveDestinationCardCommand = z.object({
  cardNumber: z.number().optional(),
});

export type ScheduledTaskArchiveOutputDto = z.infer<typeof ScheduledTaskArchiveOutputDto>;
export const ScheduledTaskArchiveOutputDto = z.object({
  commandName: z.union([z.string(), z.null()]).optional(),
  fixedTime: z.string().optional(),
  response: z.union([z.string(), z.null()]).optional(),
  hasError: z.boolean().optional(),
  executionTime: z.string().optional(),
  executionDuration: z.number().optional(),
});

export type ScheduledTaskStateEnum = z.infer<typeof ScheduledTaskStateEnum>;
export const ScheduledTaskStateEnum = z.union([z.literal(1), z.literal(2)]);

export type ScheduledTaskOutputDto = z.infer<typeof ScheduledTaskOutputDto>;
export const ScheduledTaskOutputDto = z.object({
  commandName: z.union([z.string(), z.null()]).optional(),
  fixedTime: z.string().optional(),
  state: ScheduledTaskStateEnum.optional(),
});

export type SendOtpToDeactivateCommand = z.infer<typeof SendOtpToDeactivateCommand>;
export const SendOtpToDeactivateCommand = z.object({
  keyToken: z.union([z.string(), z.null()]).optional(),
});

export type ShahkarStatusEnum = z.infer<typeof ShahkarStatusEnum>;
export const ShahkarStatusEnum = z.union([z.literal(0), z.literal(1), z.literal(2)]);

export type ShahkarInquiryOutputDto = z.infer<typeof ShahkarInquiryOutputDto>;
export const ShahkarInquiryOutputDto = z.object({
  shahkarConfirmEnum: ShahkarStatusEnum.optional(),
});

export type ShahkarInquiryQuery = z.infer<typeof ShahkarInquiryQuery>;
export const ShahkarInquiryQuery = z.object({
  mobileNumber: z.union([z.string(), z.null()]).optional(),
  nationalCode: z.union([z.string(), z.null()]).optional(),
});

export type TokenOutputDto = z.infer<typeof TokenOutputDto>;
export const TokenOutputDto = z.object({
  token: z.union([z.string(), z.null()]).optional(),
});

export type UpdateBanRuleCommand = z.infer<typeof UpdateBanRuleCommand>;
export const UpdateBanRuleCommand = z.object({
  banRuleId: z.number().optional(),
  groupName: z.union([z.string(), z.null()]).optional(),
  valueFrom: z.union([z.string(), z.null()]).optional(),
  valueTo: z.union([z.string(), z.null()]).optional(),
  start: z.union([z.string(), z.null()]).optional(),
  end: z.union([z.string(), z.null()]).optional(),
  messageKey: z.union([z.string(), z.null()]).optional(),
});

export type UpdateCityCommand = z.infer<typeof UpdateCityCommand>;
export const UpdateCityCommand = z.object({
  id: z.number().optional(),
  code: z.union([z.string(), z.null()]).optional(),
  title: z.union([z.string(), z.null()]).optional(),
});

export type UpgradeToLevelTwoCommand = z.infer<typeof UpgradeToLevelTwoCommand>;
export const UpgradeToLevelTwoCommand = z.object({
  cardNumber: z.number().optional(),
  cvV2: z.union([z.string(), z.null()]).optional(),
  expireDate: z.union([z.string(), z.null()]).optional(),
  code: z.union([z.string(), z.null()]).optional(),
  tokenForLevelTwo: z.union([z.string(), z.null()]).optional(),
});

export type UpgradeToLevelTwoOutputDto = z.infer<typeof UpgradeToLevelTwoOutputDto>;
export const UpgradeToLevelTwoOutputDto = z.object({
  deviceId: z.union([z.string(), z.null()]).optional(),
});

export type UpsertFrequentlyUsedDataCommand = z.infer<typeof UpsertFrequentlyUsedDataCommand>;
export const UpsertFrequentlyUsedDataCommand = z.object({
  category: FrequentlyDataUsedCategory.optional(),
  value: z.union([z.string(), z.null()]).optional(),
  title: z.union([z.string(), z.null()]).optional(),
  forAll: z.boolean().optional(),
});

export type UpsertFrequentlyUsedDataOutputDto = z.infer<typeof UpsertFrequentlyUsedDataOutputDto>;
export const UpsertFrequentlyUsedDataOutputDto = z.object({
  type: FrequentlyDataUsedType.optional(),
  counter: z.number().optional(),
});

export type UpsertSettingCommand = z.infer<typeof UpsertSettingCommand>;
export const UpsertSettingCommand = z.object({
  key: z.union([z.string(), z.null()]).optional(),
  value: z.union([z.string(), z.null()]).optional(),
});

export type VerifyRegisterOtpCommand = z.infer<typeof VerifyRegisterOtpCommand>;
export const VerifyRegisterOtpCommand = z.object({
  accOrCifNum: z.union([z.string(), z.null()]).optional(),
  nationalCode: z.union([z.string(), z.null()]).optional(),
  birthDate: z.union([z.string(), z.null()]).optional(),
  otpCode: z.union([z.string(), z.null()]).optional(),
  smsHashCode: z.union([z.string(), z.null()]).optional(),
});

export type VerifyRegisterOtpOutputDto = z.infer<typeof VerifyRegisterOtpOutputDto>;
export const VerifyRegisterOtpOutputDto = z.object({
  hasAccount: z.boolean().optional(),
  keyToken: z.union([z.string(), z.null()]).optional(),
  hasPresenter: z.boolean().optional(),
});

export type post_CustomerManagementBanRuleadd = typeof post_CustomerManagementBanRuleadd;
export const post_CustomerManagementBanRuleadd = {
  method: z.literal("POST"),
  path: z.literal("/customer-management/BanRule/add"),
  requestFormat: z.literal("json"),
  parameters: z.object({
    body: AddBanRuleCommand,
  }),
  response: z.number(),
};

export type post_CustomerManagementBanRuleremove = typeof post_CustomerManagementBanRuleremove;
export const post_CustomerManagementBanRuleremove = {
  method: z.literal("POST"),
  path: z.literal("/customer-management/BanRule/remove"),
  requestFormat: z.literal("json"),
  parameters: z.object({
    body: RemoveBanRuleCommand,
  }),
  response: z.boolean(),
};

export type post_CustomerManagementBanRuleupdate = typeof post_CustomerManagementBanRuleupdate;
export const post_CustomerManagementBanRuleupdate = {
  method: z.literal("POST"),
  path: z.literal("/customer-management/BanRule/update"),
  requestFormat: z.literal("json"),
  parameters: z.object({
    body: UpdateBanRuleCommand,
  }),
  response: z.boolean(),
};

export type post_CustomerManagementBanRuleget = typeof post_CustomerManagementBanRuleget;
export const post_CustomerManagementBanRuleget = {
  method: z.literal("POST"),
  path: z.literal("/customer-management/BanRule/get"),
  requestFormat: z.literal("json"),
  parameters: z.object({
    body: GetBanRulesQuery,
  }),
  response: z.array(BanRuleDto),
};

export type post_CustomerManagementBanRuleaddBanRulePerson = typeof post_CustomerManagementBanRuleaddBanRulePerson;
export const post_CustomerManagementBanRuleaddBanRulePerson = {
  method: z.literal("POST"),
  path: z.literal("/customer-management/BanRule/addBanRulePerson"),
  requestFormat: z.literal("json"),
  parameters: z.object({
    body: AddBanRulePersonCommand,
  }),
  response: z.number(),
};

export type post_CustomerManagementBanRuleremoveBanRulePerson =
  typeof post_CustomerManagementBanRuleremoveBanRulePerson;
export const post_CustomerManagementBanRuleremoveBanRulePerson = {
  method: z.literal("POST"),
  path: z.literal("/customer-management/BanRule/removeBanRulePerson"),
  requestFormat: z.literal("json"),
  parameters: z.object({
    body: RemoveBanRulePersonCommand,
  }),
  response: z.boolean(),
};

export type post_CustomerManagementBanRulegetBanRulePersons = typeof post_CustomerManagementBanRulegetBanRulePersons;
export const post_CustomerManagementBanRulegetBanRulePersons = {
  method: z.literal("POST"),
  path: z.literal("/customer-management/BanRule/getBanRulePersons"),
  requestFormat: z.literal("json"),
  parameters: z.object({
    body: GetBanRulePersonsQuery,
  }),
  response: GetBanRulePersonsOutputDtoPagedListDto,
};

export type post_CustomerManagementBanRulecheckbanruleperson = typeof post_CustomerManagementBanRulecheckbanruleperson;
export const post_CustomerManagementBanRulecheckbanruleperson = {
  method: z.literal("POST"),
  path: z.literal("/customer-management/BanRule/checkbanruleperson"),
  requestFormat: z.literal("json"),
  parameters: z.object({
    body: CheckBanRulePersonQuery,
  }),
  response: CheckBanRulePersonOutputDto,
};

export type get_CustomerManagementBanRulegetPersonBanRuleListNationalID =
  typeof get_CustomerManagementBanRulegetPersonBanRuleListNationalID;
export const get_CustomerManagementBanRulegetPersonBanRuleListNationalID = {
  method: z.literal("GET"),
  path: z.literal("/customer-management/BanRule/getPersonBanRuleList/{nationalID}"),
  requestFormat: z.literal("json"),
  parameters: z.object({
    path: z.object({
      nationalID: z.string(),
    }),
  }),
  response: z.array(GetPersonBanRuleListOutputDto),
};

export type post_CustomerManagementBanRuleaddActorLevel = typeof post_CustomerManagementBanRuleaddActorLevel;
export const post_CustomerManagementBanRuleaddActorLevel = {
  method: z.literal("POST"),
  path: z.literal("/customer-management/BanRule/addActorLevel"),
  requestFormat: z.literal("json"),
  parameters: z.object({
    body: AddBanRuleActorLevelCommand,
  }),
  response: z.number(),
};

export type post_CustomerManagementBanRuleremoveActorLevel = typeof post_CustomerManagementBanRuleremoveActorLevel;
export const post_CustomerManagementBanRuleremoveActorLevel = {
  method: z.literal("POST"),
  path: z.literal("/customer-management/BanRule/removeActorLevel"),
  requestFormat: z.literal("json"),
  parameters: z.object({
    body: RemoveBanRuleActorLevelCommand,
  }),
  response: z.boolean(),
};

export type post_CustomerManagementBanRulegetActorLevels = typeof post_CustomerManagementBanRulegetActorLevels;
export const post_CustomerManagementBanRulegetActorLevels = {
  method: z.literal("POST"),
  path: z.literal("/customer-management/BanRule/getActorLevels"),
  requestFormat: z.literal("json"),
  parameters: z.object({
    body: GetBanRuleActorLevelsQuery,
  }),
  response: GetBanRuleActorLevelsOutputDtoPagedListDto,
};

export type post_CustomerManagementCityadd = typeof post_CustomerManagementCityadd;
export const post_CustomerManagementCityadd = {
  method: z.literal("POST"),
  path: z.literal("/customer-management/City/add"),
  requestFormat: z.literal("json"),
  parameters: z.object({
    body: AddCityCommand,
  }),
  response: z.number(),
};

export type post_CustomerManagementCityremove = typeof post_CustomerManagementCityremove;
export const post_CustomerManagementCityremove = {
  method: z.literal("POST"),
  path: z.literal("/customer-management/City/remove"),
  requestFormat: z.literal("json"),
  parameters: z.object({
    body: RemoveCityCommand,
  }),
  response: z.boolean(),
};

export type post_CustomerManagementCityupdate = typeof post_CustomerManagementCityupdate;
export const post_CustomerManagementCityupdate = {
  method: z.literal("POST"),
  path: z.literal("/customer-management/City/update"),
  requestFormat: z.literal("json"),
  parameters: z.object({
    body: UpdateCityCommand,
  }),
  response: z.boolean(),
};

export type post_CustomerManagementCityget = typeof post_CustomerManagementCityget;
export const post_CustomerManagementCityget = {
  method: z.literal("POST"),
  path: z.literal("/customer-management/City/get"),
  requestFormat: z.literal("json"),
  parameters: z.object({
    body: GetCitiesQuery,
  }),
  response: z.array(CityOutputDto),
};

export type post_CustomerManagementFrequentlyUsedDataupsert = typeof post_CustomerManagementFrequentlyUsedDataupsert;
export const post_CustomerManagementFrequentlyUsedDataupsert = {
  method: z.literal("POST"),
  path: z.literal("/customer-management/FrequentlyUsedData/upsert"),
  requestFormat: z.literal("json"),
  parameters: z.object({
    body: UpsertFrequentlyUsedDataCommand,
  }),
  response: UpsertFrequentlyUsedDataOutputDto,
};

export type post_CustomerManagementFrequentlyUsedDataincreaseusage =
  typeof post_CustomerManagementFrequentlyUsedDataincreaseusage;
export const post_CustomerManagementFrequentlyUsedDataincreaseusage = {
  method: z.literal("POST"),
  path: z.literal("/customer-management/FrequentlyUsedData/increaseusage"),
  requestFormat: z.literal("json"),
  parameters: z.object({
    body: IncreaseFrequentlyUsedDataUsageCommand,
  }),
  response: z.boolean(),
};

export type post_CustomerManagementFrequentlyUsedDataremove = typeof post_CustomerManagementFrequentlyUsedDataremove;
export const post_CustomerManagementFrequentlyUsedDataremove = {
  method: z.literal("POST"),
  path: z.literal("/customer-management/FrequentlyUsedData/remove"),
  requestFormat: z.literal("json"),
  parameters: z.object({
    body: FrequentlyDatasRemoveCommand,
  }),
  response: z.boolean(),
};

export type post_CustomerManagementFrequentlyUsedDataGetData = typeof post_CustomerManagementFrequentlyUsedDataGetData;
export const post_CustomerManagementFrequentlyUsedDataGetData = {
  method: z.literal("POST"),
  path: z.literal("/customer-management/FrequentlyUsedData/GetData"),
  requestFormat: z.literal("json"),
  parameters: z.object({
    body: GetFrequentlyUsedDataQuery,
  }),
  response: GetFrequentlyUsedDataOutputDto,
};

export type get_CustomerManagementFrequentlyUsedDataGetSources =
  typeof get_CustomerManagementFrequentlyUsedDataGetSources;
export const get_CustomerManagementFrequentlyUsedDataGetSources = {
  method: z.literal("GET"),
  path: z.literal("/customer-management/FrequentlyUsedData/GetSources"),
  requestFormat: z.literal("json"),
  parameters: z.never(),
  response: GetFrequentlyUsedSourcesOutputDto,
};

export type get_CustomerManagementNonAttendanceLoangetloantokenEmail =
  typeof get_CustomerManagementNonAttendanceLoangetloantokenEmail;
export const get_CustomerManagementNonAttendanceLoangetloantokenEmail = {
  method: z.literal("GET"),
  path: z.literal("/customer-management/NonAttendanceLoan/getloantoken/{email}"),
  requestFormat: z.literal("json"),
  parameters: z.object({
    path: z.object({
      email: z.string(),
    }),
  }),
  response: TokenOutputDto,
};

export type get_CustomerManagementProfilegetProfiles = typeof get_CustomerManagementProfilegetProfiles;
export const get_CustomerManagementProfilegetProfiles = {
  method: z.literal("GET"),
  path: z.literal("/customer-management/Profile/getProfiles"),
  requestFormat: z.literal("json"),
  parameters: z.never(),
  response: GetUserProfilesOutputDto,
};

export type post_CustomerManagementProfilesavedestinationaccount =
  typeof post_CustomerManagementProfilesavedestinationaccount;
export const post_CustomerManagementProfilesavedestinationaccount = {
  method: z.literal("POST"),
  path: z.literal("/customer-management/Profile/savedestinationaccount"),
  requestFormat: z.literal("json"),
  parameters: z.object({
    body: SaveDestinationAccountCommand,
  }),
  response: z.boolean(),
};

export type post_CustomerManagementProfilesavedestinationcard =
  typeof post_CustomerManagementProfilesavedestinationcard;
export const post_CustomerManagementProfilesavedestinationcard = {
  method: z.literal("POST"),
  path: z.literal("/customer-management/Profile/savedestinationcard"),
  requestFormat: z.literal("json"),
  parameters: z.object({
    body: SaveDestinationCardCommand,
  }),
  response: z.boolean(),
};

export type get_CustomerManagementProfilegetappname = typeof get_CustomerManagementProfilegetappname;
export const get_CustomerManagementProfilegetappname = {
  method: z.literal("GET"),
  path: z.literal("/customer-management/Profile/getappname"),
  requestFormat: z.literal("json"),
  parameters: z.never(),
  response: AppNameDto,
};

export type post_CustomerManagementScheduledTaskget = typeof post_CustomerManagementScheduledTaskget;
export const post_CustomerManagementScheduledTaskget = {
  method: z.literal("POST"),
  path: z.literal("/customer-management/ScheduledTask/get"),
  requestFormat: z.literal("json"),
  parameters: z.object({
    body: GetScheduledTasksQuery,
  }),
  response: z.array(ScheduledTaskOutputDto),
};

export type post_CustomerManagementScheduledTaskgetArchive = typeof post_CustomerManagementScheduledTaskgetArchive;
export const post_CustomerManagementScheduledTaskgetArchive = {
  method: z.literal("POST"),
  path: z.literal("/customer-management/ScheduledTask/getArchive"),
  requestFormat: z.literal("json"),
  parameters: z.object({
    body: GetScheduledTasksArchiveQuery,
  }),
  response: z.array(ScheduledTaskArchiveOutputDto),
};

export type post_CustomerManagementSettingDraftsaddsettingdraft =
  typeof post_CustomerManagementSettingDraftsaddsettingdraft;
export const post_CustomerManagementSettingDraftsaddsettingdraft = {
  method: z.literal("POST"),
  path: z.literal("/customer-management/SettingDrafts/addsettingdraft"),
  requestFormat: z.literal("json"),
  parameters: z.object({
    body: AddSettingDraftCommand,
  }),
  response: z.boolean(),
};

export type post_CustomerManagementSettingDraftsapprovesettingdraft =
  typeof post_CustomerManagementSettingDraftsapprovesettingdraft;
export const post_CustomerManagementSettingDraftsapprovesettingdraft = {
  method: z.literal("POST"),
  path: z.literal("/customer-management/SettingDrafts/approvesettingdraft"),
  requestFormat: z.literal("json"),
  parameters: z.object({
    body: ApproveSettingDraftCommand,
  }),
  response: z.boolean(),
};

export type post_CustomerManagementSettingDraftsdeletesettingdraft =
  typeof post_CustomerManagementSettingDraftsdeletesettingdraft;
export const post_CustomerManagementSettingDraftsdeletesettingdraft = {
  method: z.literal("POST"),
  path: z.literal("/customer-management/SettingDrafts/deletesettingdraft"),
  requestFormat: z.literal("json"),
  parameters: z.object({
    body: DeleteSettingDraftCommand,
  }),
  response: z.boolean(),
};

export type post_CustomerManagementSettingDraftseditsettingdraft =
  typeof post_CustomerManagementSettingDraftseditsettingdraft;
export const post_CustomerManagementSettingDraftseditsettingdraft = {
  method: z.literal("POST"),
  path: z.literal("/customer-management/SettingDrafts/editsettingdraft"),
  requestFormat: z.literal("json"),
  parameters: z.object({
    body: EditSettingDraftCommand,
  }),
  response: z.boolean(),
};

export type post_CustomerManagementSettingDraftsrejectsettingdraft =
  typeof post_CustomerManagementSettingDraftsrejectsettingdraft;
export const post_CustomerManagementSettingDraftsrejectsettingdraft = {
  method: z.literal("POST"),
  path: z.literal("/customer-management/SettingDrafts/rejectsettingdraft"),
  requestFormat: z.literal("json"),
  parameters: z.object({
    body: RejectSettingDraftCommand,
  }),
  response: z.boolean(),
};

export type post_CustomerManagementSettingDraftsgetallsettings =
  typeof post_CustomerManagementSettingDraftsgetallsettings;
export const post_CustomerManagementSettingDraftsgetallsettings = {
  method: z.literal("POST"),
  path: z.literal("/customer-management/SettingDrafts/getallsettings"),
  requestFormat: z.literal("json"),
  parameters: z.object({
    body: GetSettingDraftsQuery,
  }),
  response: GetSettingDraftsDtoPagedListDto,
};

export type post_CustomerManagementSettingssettings = typeof post_CustomerManagementSettingssettings;
export const post_CustomerManagementSettingssettings = {
  method: z.literal("POST"),
  path: z.literal("/customer-management/Settings/settings"),
  requestFormat: z.literal("json"),
  parameters: z.object({
    body: GetSettingsQuery,
  }),
  response: GetSettingDtoPagedListDto,
};

export type post_CustomerManagementSettingsupsert = typeof post_CustomerManagementSettingsupsert;
export const post_CustomerManagementSettingsupsert = {
  method: z.literal("POST"),
  path: z.literal("/customer-management/Settings/upsert"),
  requestFormat: z.literal("json"),
  parameters: z.object({
    body: UpsertSettingCommand,
  }),
  response: z.boolean(),
};

export type post_CustomerManagementSettingsdelete = typeof post_CustomerManagementSettingsdelete;
export const post_CustomerManagementSettingsdelete = {
  method: z.literal("POST"),
  path: z.literal("/customer-management/Settings/delete"),
  requestFormat: z.literal("json"),
  parameters: z.object({
    body: DeleteSettingCommand,
  }),
  response: z.boolean(),
};

export type get_CustomerManagementUsersversion = typeof get_CustomerManagementUsersversion;
export const get_CustomerManagementUsersversion = {
  method: z.literal("GET"),
  path: z.literal("/customer-management/Users/version"),
  requestFormat: z.literal("json"),
  parameters: z.never(),
  response: z.unknown(),
};

export type get_CustomerManagementUsershealthstatus = typeof get_CustomerManagementUsershealthstatus;
export const get_CustomerManagementUsershealthstatus = {
  method: z.literal("GET"),
  path: z.literal("/customer-management/Users/healthstatus"),
  requestFormat: z.literal("json"),
  parameters: z.never(),
  response: GetHealthStatusOutputDto,
};

export type get_CustomerManagementUserSettinggetSettingsLastGetToken =
  typeof get_CustomerManagementUserSettinggetSettingsLastGetToken;
export const get_CustomerManagementUserSettinggetSettingsLastGetToken = {
  method: z.literal("GET"),
  path: z.literal("/customer-management/UserSetting/getSettings/{lastGetToken}"),
  requestFormat: z.literal("json"),
  parameters: z.object({
    path: z.object({
      lastGetToken: z.number(),
    }),
  }),
  response: GetUserSettingsOutputDto,
};

export type post_CustomerManagementUserSettingadd = typeof post_CustomerManagementUserSettingadd;
export const post_CustomerManagementUserSettingadd = {
  method: z.literal("POST"),
  path: z.literal("/customer-management/UserSetting/add"),
  requestFormat: z.literal("json"),
  parameters: z.object({
    body: AddUserSettingCommand,
  }),
  response: z.boolean(),
};

export type post_CustomerManagementVirtualCustomercreatecustomer =
  typeof post_CustomerManagementVirtualCustomercreatecustomer;
export const post_CustomerManagementVirtualCustomercreatecustomer = {
  method: z.literal("POST"),
  path: z.literal("/customer-management/VirtualCustomer/createcustomer"),
  requestFormat: z.literal("json"),
  parameters: z.object({
    body: CreateCustomerCommand,
  }),
  response: CreateCustomerOutputDto,
};

export type post_CustomerManagerpreregister = typeof post_CustomerManagerpreregister;
export const post_CustomerManagerpreregister = {
  method: z.literal("POST"),
  path: z.literal("/CustomerManager/preregister"),
  requestFormat: z.literal("json"),
  parameters: z.object({
    body: PreRegisterCommand,
  }),
  response: PreRegisterOutputDto,
};

export type post_CustomerManagerverifyregisterotp = typeof post_CustomerManagerverifyregisterotp;
export const post_CustomerManagerverifyregisterotp = {
  method: z.literal("POST"),
  path: z.literal("/CustomerManager/verifyregisterotp"),
  requestFormat: z.literal("json"),
  parameters: z.object({
    body: VerifyRegisterOtpCommand,
  }),
  response: VerifyRegisterOtpOutputDto,
};

export type post_CustomerManagerregister = typeof post_CustomerManagerregister;
export const post_CustomerManagerregister = {
  method: z.literal("POST"),
  path: z.literal("/CustomerManager/register"),
  requestFormat: z.literal("json"),
  parameters: z.object({
    body: RegisterCommand,
  }),
  response: RegisterOutputDto,
};

export type post_CustomerManagerdevicevalidation = typeof post_CustomerManagerdevicevalidation;
export const post_CustomerManagerdevicevalidation = {
  method: z.literal("POST"),
  path: z.literal("/CustomerManager/devicevalidation"),
  requestFormat: z.literal("json"),
  parameters: z.object({
    body: DeviceValidationQuery,
  }),
  response: DeviceValidationOutputDto,
};

export type get_CustomerManageraccountsCifNoChannel = typeof get_CustomerManageraccountsCifNoChannel;
export const get_CustomerManageraccountsCifNoChannel = {
  method: z.literal("GET"),
  path: z.literal("/CustomerManager/accounts/{cifNo}/{channel}"),
  requestFormat: z.literal("json"),
  parameters: z.object({
    path: z.object({
      cifNo: z.number(),
      channel: z.union([z.literal(1), z.literal(2), z.literal(4), z.literal(8), z.literal(16), z.literal(32)]),
    }),
  }),
  response: z.array(AccountOutputDto),
};

export type get_CustomerManageraccounts = typeof get_CustomerManageraccounts;
export const get_CustomerManageraccounts = {
  method: z.literal("GET"),
  path: z.literal("/CustomerManager/accounts"),
  requestFormat: z.literal("json"),
  parameters: z.never(),
  response: z.array(AccountOutputDto),
};

export type get_CustomerManagercurrentaccounts = typeof get_CustomerManagercurrentaccounts;
export const get_CustomerManagercurrentaccounts = {
  method: z.literal("GET"),
  path: z.literal("/CustomerManager/currentaccounts"),
  requestFormat: z.literal("json"),
  parameters: z.never(),
  response: z.array(AccountOutputDto),
};

export type post_CustomerManagercurrentaccounts = typeof post_CustomerManagercurrentaccounts;
export const post_CustomerManagercurrentaccounts = {
  method: z.literal("POST"),
  path: z.literal("/CustomerManager/currentaccounts"),
  requestFormat: z.literal("json"),
  parameters: z.object({
    body: CustomerCurrentAccountsWithoutTokenQuery,
  }),
  response: z.array(AccountOutputDto),
};

export type get_CustomerManagercardsCifNoChannel = typeof get_CustomerManagercardsCifNoChannel;
export const get_CustomerManagercardsCifNoChannel = {
  method: z.literal("GET"),
  path: z.literal("/CustomerManager/cards/{cifNo}/{channel}"),
  requestFormat: z.literal("json"),
  parameters: z.object({
    path: z.object({
      cifNo: z.number(),
      channel: z.union([z.literal(1), z.literal(2), z.literal(4), z.literal(8), z.literal(16), z.literal(32)]),
    }),
  }),
  response: z.array(CardOutputDto),
};

export type post_CustomerManagercards = typeof post_CustomerManagercards;
export const post_CustomerManagercards = {
  method: z.literal("POST"),
  path: z.literal("/CustomerManager/cards"),
  requestFormat: z.literal("json"),
  parameters: z.object({
    body: CustomerCardsQurey,
  }),
  response: z.array(CardOutputDto),
};

export type get_CustomerManagercards = typeof get_CustomerManagercards;
export const get_CustomerManagercards = {
  method: z.literal("GET"),
  path: z.literal("/CustomerManager/cards"),
  requestFormat: z.literal("json"),
  parameters: z.never(),
  response: z.array(CardOutputDto),
};

export type get_CustomerManageraccountsandcardsCifNoChannel = typeof get_CustomerManageraccountsandcardsCifNoChannel;
export const get_CustomerManageraccountsandcardsCifNoChannel = {
  method: z.literal("GET"),
  path: z.literal("/CustomerManager/accountsandcards/{cifNo}/{channel}"),
  requestFormat: z.literal("json"),
  parameters: z.object({
    path: z.object({
      cifNo: z.number(),
      channel: z.union([z.literal(1), z.literal(2), z.literal(4), z.literal(8), z.literal(16), z.literal(32)]),
    }),
  }),
  response: AccountAndCardOutputDto,
};

export type get_CustomerManageraccountsandcards = typeof get_CustomerManageraccountsandcards;
export const get_CustomerManageraccountsandcards = {
  method: z.literal("GET"),
  path: z.literal("/CustomerManager/accountsandcards"),
  requestFormat: z.literal("json"),
  parameters: z.never(),
  response: AccountAndCardOutputDto,
};

export type post_CustomerManagerrelatetoacccustomres = typeof post_CustomerManagerrelatetoacccustomres;
export const post_CustomerManagerrelatetoacccustomres = {
  method: z.literal("POST"),
  path: z.literal("/CustomerManager/relatetoacccustomres"),
  requestFormat: z.literal("json"),
  parameters: z.object({
    body: GetCustomersRelatedToAccountQuery,
  }),
  response: z.array(CusRelateToAccOutputDto),
};

export type post_CustomerManagerupdateaccountandcards = typeof post_CustomerManagerupdateaccountandcards;
export const post_CustomerManagerupdateaccountandcards = {
  method: z.literal("POST"),
  path: z.literal("/CustomerManager/updateaccountandcards"),
  requestFormat: z.literal("json"),
  parameters: z.never(),
  response: AccountAndCardOutputDto,
};

export type post_CustomerManagerupdateaccounts = typeof post_CustomerManagerupdateaccounts;
export const post_CustomerManagerupdateaccounts = {
  method: z.literal("POST"),
  path: z.literal("/CustomerManager/updateaccounts"),
  requestFormat: z.literal("json"),
  parameters: z.never(),
  response: z.array(AccountOutputDto),
};

export type post_CustomerManagerupdatecards = typeof post_CustomerManagerupdatecards;
export const post_CustomerManagerupdatecards = {
  method: z.literal("POST"),
  path: z.literal("/CustomerManager/updatecards"),
  requestFormat: z.literal("json"),
  parameters: z.never(),
  response: z.array(CardOutputDto),
};

export type post_CustomerManagercheckcustomeraccounts = typeof post_CustomerManagercheckcustomeraccounts;
export const post_CustomerManagercheckcustomeraccounts = {
  method: z.literal("POST"),
  path: z.literal("/CustomerManager/checkcustomeraccounts"),
  requestFormat: z.literal("json"),
  parameters: z.object({
    body: CheckAccountQuery,
  }),
  response: z.array(CheckAccountOutputDto),
};

export type post_CustomerManagercheckcustomercard = typeof post_CustomerManagercheckcustomercard;
export const post_CustomerManagercheckcustomercard = {
  method: z.literal("POST"),
  path: z.literal("/CustomerManager/checkcustomercard"),
  requestFormat: z.literal("json"),
  parameters: z.object({
    body: CheckCardQuery,
  }),
  response: CheckCardOutputDto,
};

export type post_CustomerManagerdeletecard = typeof post_CustomerManagerdeletecard;
export const post_CustomerManagerdeletecard = {
  method: z.literal("POST"),
  path: z.literal("/CustomerManager/deletecard"),
  requestFormat: z.literal("json"),
  parameters: z.object({
    body: DeleteCardCommand,
  }),
  response: z.boolean(),
};

export type post_CustomerManagerdeleteaccount = typeof post_CustomerManagerdeleteaccount;
export const post_CustomerManagerdeleteaccount = {
  method: z.literal("POST"),
  path: z.literal("/CustomerManager/deleteaccount"),
  requestFormat: z.literal("json"),
  parameters: z.object({
    body: DeleteAccountCommand,
  }),
  response: z.boolean(),
};

export type post_CustomerManageraddcard = typeof post_CustomerManageraddcard;
export const post_CustomerManageraddcard = {
  method: z.literal("POST"),
  path: z.literal("/CustomerManager/addcard"),
  requestFormat: z.literal("json"),
  parameters: z.object({
    body: AddCardCommand,
  }),
  response: AddCardOutputDto,
};

export type post_CustomerManageraddaccount = typeof post_CustomerManageraddaccount;
export const post_CustomerManageraddaccount = {
  method: z.literal("POST"),
  path: z.literal("/CustomerManager/addaccount"),
  requestFormat: z.literal("json"),
  parameters: z.object({
    body: AddAccountCommand,
  }),
  response: z.boolean(),
};

export type post_CustomerManagerrequestzerolevel = typeof post_CustomerManagerrequestzerolevel;
export const post_CustomerManagerrequestzerolevel = {
  method: z.literal("POST"),
  path: z.literal("/CustomerManager/requestzerolevel"),
  requestFormat: z.literal("json"),
  parameters: z.object({
    body: RequestRegisterZeroLevelCommand,
  }),
  response: RequestRegisterZeroLevelOutputDto,
};

export type post_CustomerManagercheckotpzerolevel = typeof post_CustomerManagercheckotpzerolevel;
export const post_CustomerManagercheckotpzerolevel = {
  method: z.literal("POST"),
  path: z.literal("/CustomerManager/checkotpzerolevel"),
  requestFormat: z.literal("json"),
  parameters: z.object({
    body: CheckOtpRegisterZeroLevelCommand,
  }),
  response: CheckOtpRegisterZeroLevelOutputDto,
};

export type post_CustomerManagerconfirmzerolevel = typeof post_CustomerManagerconfirmzerolevel;
export const post_CustomerManagerconfirmzerolevel = {
  method: z.literal("POST"),
  path: z.literal("/CustomerManager/confirmzerolevel"),
  requestFormat: z.literal("json"),
  parameters: z.object({
    body: ConfirmRegisterZeroLevelCommand,
  }),
  response: ConfirmRegisterZeroLevelOutputDto,
};

export type get_CustomerManagercustomercompleteinfoCifNo = typeof get_CustomerManagercustomercompleteinfoCifNo;
export const get_CustomerManagercustomercompleteinfoCifNo = {
  method: z.literal("GET"),
  path: z.literal("/CustomerManager/customercompleteinfo/{cifNo}"),
  requestFormat: z.literal("json"),
  parameters: z.object({
    path: z.object({
      cifNo: z.number(),
    }),
  }),
  response: CustomerTotalInfoOutputDto,
};

export type get_CustomerManagercustomercompleteinfobyssnSsn = typeof get_CustomerManagercustomercompleteinfobyssnSsn;
export const get_CustomerManagercustomercompleteinfobyssnSsn = {
  method: z.literal("GET"),
  path: z.literal("/CustomerManager/customercompleteinfobyssn/{ssn}"),
  requestFormat: z.literal("json"),
  parameters: z.object({
    path: z.object({
      ssn: z.string(),
    }),
  }),
  response: CustomerTotalInfoBySSNOutputDto,
};

export type post_CustomerManagerrequestupgradeleveltwo = typeof post_CustomerManagerrequestupgradeleveltwo;
export const post_CustomerManagerrequestupgradeleveltwo = {
  method: z.literal("POST"),
  path: z.literal("/CustomerManager/requestupgradeleveltwo"),
  requestFormat: z.literal("json"),
  parameters: z.object({
    body: RequestUpgradeForLevelTwoCommand,
  }),
  response: RequestUpgradeForLevelTwoOutputDto,
};

export type post_CustomerManagerconfirmupgradeleveltwo = typeof post_CustomerManagerconfirmupgradeleveltwo;
export const post_CustomerManagerconfirmupgradeleveltwo = {
  method: z.literal("POST"),
  path: z.literal("/CustomerManager/confirmupgradeleveltwo"),
  requestFormat: z.literal("json"),
  parameters: z.object({
    body: ConfirmUpgradeForLevelTwoCommand,
  }),
  response: ConfirmUpgradeForLevelTwoOutputDto,
};

export type post_CustomerManagerreqotpleveltwobeforelogin = typeof post_CustomerManagerreqotpleveltwobeforelogin;
export const post_CustomerManagerreqotpleveltwobeforelogin = {
  method: z.literal("POST"),
  path: z.literal("/CustomerManager/reqotpleveltwobeforelogin"),
  requestFormat: z.literal("json"),
  parameters: z.object({
    body: HarimForLevelTwoAuthCommand,
  }),
  response: HarimForLevelTwoAuthOutputDto,
};

export type post_CustomerManagerleveluptwobeforelogin = typeof post_CustomerManagerleveluptwobeforelogin;
export const post_CustomerManagerleveluptwobeforelogin = {
  method: z.literal("POST"),
  path: z.literal("/CustomerManager/leveluptwobeforelogin"),
  requestFormat: z.literal("json"),
  parameters: z.object({
    body: UpgradeToLevelTwoCommand,
  }),
  response: UpgradeToLevelTwoOutputDto,
};

export type post_CustomerManageriscustomerownerofaccount = typeof post_CustomerManageriscustomerownerofaccount;
export const post_CustomerManageriscustomerownerofaccount = {
  method: z.literal("POST"),
  path: z.literal("/CustomerManager/iscustomerownerofaccount"),
  requestFormat: z.literal("json"),
  parameters: z.object({
    body: IsCustomerOwnerOfAccountQuery,
  }),
  response: z.boolean(),
};

export type post_CustomerManagerinternetbankcreateuser = typeof post_CustomerManagerinternetbankcreateuser;
export const post_CustomerManagerinternetbankcreateuser = {
  method: z.literal("POST"),
  path: z.literal("/CustomerManager/internetbankcreateuser"),
  requestFormat: z.literal("json"),
  parameters: z.object({
    body: IBCreateUserCommand,
  }),
  response: IBCreateUserOutputDto,
};

export type post_CustomerManagergetcustomertoken = typeof post_CustomerManagergetcustomertoken;
export const post_CustomerManagergetcustomertoken = {
  method: z.literal("POST"),
  path: z.literal("/CustomerManager/getcustomertoken"),
  requestFormat: z.literal("json"),
  parameters: z.object({
    body: GetTokenQuery,
  }),
  response: CustomerInfoTokenOutputDto,
};

export type post_CustomerManagerdeactivatecustomerstart = typeof post_CustomerManagerdeactivatecustomerstart;
export const post_CustomerManagerdeactivatecustomerstart = {
  method: z.literal("POST"),
  path: z.literal("/CustomerManager/deactivatecustomerstart"),
  requestFormat: z.literal("json"),
  parameters: z.object({
    body: GetCustomerForDeactivateQuery,
  }),
  response: CustomerInfoForDeactivateOutputDto,
};

export type post_CustomerManagerdeactivatecustomermobilematching =
  typeof post_CustomerManagerdeactivatecustomermobilematching;
export const post_CustomerManagerdeactivatecustomermobilematching = {
  method: z.literal("POST"),
  path: z.literal("/CustomerManager/deactivatecustomermobilematching"),
  requestFormat: z.literal("json"),
  parameters: z.object({
    body: MobileMatchCommand,
  }),
  response: MobileMatchOutputDto,
};

export type post_CustomerManagersendotptodeactivatecustomer = typeof post_CustomerManagersendotptodeactivatecustomer;
export const post_CustomerManagersendotptodeactivatecustomer = {
  method: z.literal("POST"),
  path: z.literal("/CustomerManager/sendotptodeactivatecustomer"),
  requestFormat: z.literal("json"),
  parameters: z.object({
    body: SendOtpToDeactivateCommand,
  }),
  response: DeactivateOtpOutputDto,
};

export type post_CustomerManagerdeactivatecustomerinallchannels =
  typeof post_CustomerManagerdeactivatecustomerinallchannels;
export const post_CustomerManagerdeactivatecustomerinallchannels = {
  method: z.literal("POST"),
  path: z.literal("/CustomerManager/deactivatecustomerinallchannels"),
  requestFormat: z.literal("json"),
  parameters: z.object({
    body: DeactivateAllChannelCommand,
  }),
  response: DeactivateAllOutputDto,
};

export type get_CustomerManagergetfacilityaccounts = typeof get_CustomerManagergetfacilityaccounts;
export const get_CustomerManagergetfacilityaccounts = {
  method: z.literal("GET"),
  path: z.literal("/CustomerManager/getfacilityaccounts"),
  requestFormat: z.literal("json"),
  parameters: z.never(),
  response: z.array(FacilityAccountOutputDto),
};

export type post_CustomerManagerupdatefacilityaccounts = typeof post_CustomerManagerupdatefacilityaccounts;
export const post_CustomerManagerupdatefacilityaccounts = {
  method: z.literal("POST"),
  path: z.literal("/CustomerManager/updatefacilityaccounts"),
  requestFormat: z.literal("json"),
  parameters: z.never(),
  response: z.array(FacilityAccountOutputDto),
};

export type post_CustomerManagercheckcardvalidforactivation = typeof post_CustomerManagercheckcardvalidforactivation;
export const post_CustomerManagercheckcardvalidforactivation = {
  method: z.literal("POST"),
  path: z.literal("/CustomerManager/checkcardvalidforactivation"),
  requestFormat: z.literal("json"),
  parameters: z.object({
    body: CheckCardValidForActivationQuery,
  }),
  response: z.boolean(),
};

export type post_CustomerManagerisfacilityaccountbelongtocustomer =
  typeof post_CustomerManagerisfacilityaccountbelongtocustomer;
export const post_CustomerManagerisfacilityaccountbelongtocustomer = {
  method: z.literal("POST"),
  path: z.literal("/CustomerManager/isfacilityaccountbelongtocustomer"),
  requestFormat: z.literal("json"),
  parameters: z.object({
    body: CheckFacilityBelongToCustomerQuery,
  }),
  response: z.boolean(),
};

export type post_CustomerManagerdeacnationalcodematching = typeof post_CustomerManagerdeacnationalcodematching;
export const post_CustomerManagerdeacnationalcodematching = {
  method: z.literal("POST"),
  path: z.literal("/CustomerManager/deacnationalcodematching"),
  requestFormat: z.literal("json"),
  parameters: z.object({
    body: GetNationalCodeQuery,
  }),
  response: GetNationalCodeOutputDto,
};

export type post_CustomerManageraddpresentercode = typeof post_CustomerManageraddpresentercode;
export const post_CustomerManageraddpresentercode = {
  method: z.literal("POST"),
  path: z.literal("/CustomerManager/addpresentercode"),
  requestFormat: z.literal("json"),
  parameters: z.object({
    body: AddPresenterCodeCommand,
  }),
  response: z.boolean(),
};

export type get_CustomerManagergetpresentcode = typeof get_CustomerManagergetpresentcode;
export const get_CustomerManagergetpresentcode = {
  method: z.literal("GET"),
  path: z.literal("/CustomerManager/getpresentcode"),
  requestFormat: z.literal("json"),
  parameters: z.never(),
  response: PresentCodeOutputDto,
};

export type post_CustomerManagergetadminallcustomers = typeof post_CustomerManagergetadminallcustomers;
export const post_CustomerManagergetadminallcustomers = {
  method: z.literal("POST"),
  path: z.literal("/CustomerManager/getadminallcustomers"),
  requestFormat: z.literal("json"),
  parameters: z.object({
    body: GetCustomersForAdminQuery,
  }),
  response: CustomerOutputDtoPagedListDto,
};

export type post_CustomerManagergetadmincustomerdetail = typeof post_CustomerManagergetadmincustomerdetail;
export const post_CustomerManagergetadmincustomerdetail = {
  method: z.literal("POST"),
  path: z.literal("/CustomerManager/getadmincustomerdetail"),
  requestFormat: z.literal("json"),
  parameters: z.object({
    body: GetCustomerDetailForAdminQuery,
  }),
  response: CustomerDetailOutputDto,
};

export type post_CustomerManagerAddOrganizationClaimToUser = typeof post_CustomerManagerAddOrganizationClaimToUser;
export const post_CustomerManagerAddOrganizationClaimToUser = {
  method: z.literal("POST"),
  path: z.literal("/CustomerManager/AddOrganizationClaimToUser"),
  requestFormat: z.literal("json"),
  parameters: z.object({
    body: AddOrganizationClaimToUserCommand,
  }),
  response: z.boolean(),
};

export type post_CustomerManagerinquirypresentercode = typeof post_CustomerManagerinquirypresentercode;
export const post_CustomerManagerinquirypresentercode = {
  method: z.literal("POST"),
  path: z.literal("/CustomerManager/inquirypresentercode"),
  requestFormat: z.literal("json"),
  parameters: z.object({
    body: InquiryPresenterCodeQuery,
  }),
  response: InquiryPresenterCodeOutputDto,
};

export type post_CustomerManagerremoveorganizationclaimsforuser =
  typeof post_CustomerManagerremoveorganizationclaimsforuser;
export const post_CustomerManagerremoveorganizationclaimsforuser = {
  method: z.literal("POST"),
  path: z.literal("/CustomerManager/removeorganizationclaimsforuser"),
  requestFormat: z.literal("json"),
  parameters: z.object({
    body: RemoveOrganizationClaimsForUserCommand,
  }),
  response: z.boolean(),
};

export type post_CustomerManageraddaccountsigngranted = typeof post_CustomerManageraddaccountsigngranted;
export const post_CustomerManageraddaccountsigngranted = {
  method: z.literal("POST"),
  path: z.literal("/CustomerManager/addaccountsigngranted"),
  requestFormat: z.literal("json"),
  parameters: z.object({
    body: AddSignGrantedCommand,
  }),
  response: z.boolean(),
};

export type post_CustomerManagergetaccountsbysigngranted = typeof post_CustomerManagergetaccountsbysigngranted;
export const post_CustomerManagergetaccountsbysigngranted = {
  method: z.literal("POST"),
  path: z.literal("/CustomerManager/getaccountsbysigngranted"),
  requestFormat: z.literal("json"),
  parameters: z.object({
    body: GetAccountsBySignGrantedInternalQuery,
  }),
  response: z.array(AccountOutputDto),
};

export type get_CustomerManagergetaccountsbysigngranted = typeof get_CustomerManagergetaccountsbysigngranted;
export const get_CustomerManagergetaccountsbysigngranted = {
  method: z.literal("GET"),
  path: z.literal("/CustomerManager/getaccountsbysigngranted"),
  requestFormat: z.literal("json"),
  parameters: z.never(),
  response: z.array(AccountOutputDto),
};

export type get_CustomerManagergetallrelatedcustomersService = typeof get_CustomerManagergetallrelatedcustomersService;
export const get_CustomerManagergetallrelatedcustomersService = {
  method: z.literal("GET"),
  path: z.literal("/CustomerManager/getallrelatedcustomers/{service}"),
  requestFormat: z.literal("json"),
  parameters: z.object({
    path: z.object({
      service: z.string(),
    }),
  }),
  response: z.array(RelatedCustomerOutputDto),
};

export type post_CustomerManagerinternalupdatecards = typeof post_CustomerManagerinternalupdatecards;
export const post_CustomerManagerinternalupdatecards = {
  method: z.literal("POST"),
  path: z.literal("/CustomerManager/internalupdatecards"),
  requestFormat: z.literal("json"),
  parameters: z.object({
    body: InternalUpdateCardCommand,
  }),
  response: z.array(CardOutputDto),
};

export type get_CustomerManagergetaddress = typeof get_CustomerManagergetaddress;
export const get_CustomerManagergetaddress = {
  method: z.literal("GET"),
  path: z.literal("/CustomerManager/getaddress"),
  requestFormat: z.literal("json"),
  parameters: z.never(),
  response: GetCustomerAddressOutputDto,
};

export type post_CustomerManagersabtahvalinquiry = typeof post_CustomerManagersabtahvalinquiry;
export const post_CustomerManagersabtahvalinquiry = {
  method: z.literal("POST"),
  path: z.literal("/CustomerManager/sabtahvalinquiry"),
  requestFormat: z.literal("json"),
  parameters: z.object({
    body: SabtAhvalInquiryQuery,
  }),
  response: SabtAhvalInquiryOutputDto,
};

export type post_CustomerManagershahkarinquiry = typeof post_CustomerManagershahkarinquiry;
export const post_CustomerManagershahkarinquiry = {
  method: z.literal("POST"),
  path: z.literal("/CustomerManager/shahkarinquiry"),
  requestFormat: z.literal("json"),
  parameters: z.object({
    body: ShahkarInquiryQuery,
  }),
  response: ShahkarInquiryOutputDto,
};

export type post_CustomerManagernahabinquiry = typeof post_CustomerManagernahabinquiry;
export const post_CustomerManagernahabinquiry = {
  method: z.literal("POST"),
  path: z.literal("/CustomerManager/nahabinquiry"),
  requestFormat: z.literal("json"),
  parameters: z.object({
    body: InquiryNahabQuery,
  }),
  response: InquiryNahabOutputDto,
};

export type post_CustomerManagersanainquiry = typeof post_CustomerManagersanainquiry;
export const post_CustomerManagersanainquiry = {
  method: z.literal("POST"),
  path: z.literal("/CustomerManager/sanainquiry"),
  requestFormat: z.literal("json"),
  parameters: z.object({
    body: SanaInquiryQuery,
  }),
  response: SanaInquiryOutputDto,
};

export type get_CustomerManagergetlegalrelatedcustomers = typeof get_CustomerManagergetlegalrelatedcustomers;
export const get_CustomerManagergetlegalrelatedcustomers = {
  method: z.literal("GET"),
  path: z.literal("/CustomerManager/getlegalrelatedcustomers"),
  requestFormat: z.literal("json"),
  parameters: z.never(),
  response: z.array(LegalRelatedCustomerOutputDto),
};

export type post_CustomerManagerislegalrelatedcustomerrelationexist =
  typeof post_CustomerManagerislegalrelatedcustomerrelationexist;
export const post_CustomerManagerislegalrelatedcustomerrelationexist = {
  method: z.literal("POST"),
  path: z.literal("/CustomerManager/islegalrelatedcustomerrelationexist"),
  requestFormat: z.literal("json"),
  parameters: z.object({
    body: IsLegalRelatedCustomerRelationExistQuery,
  }),
  response: IsLegalRelatedCustomerRelationExistOutputDto,
};

export type post_CustomerManageronlineaccounts = typeof post_CustomerManageronlineaccounts;
export const post_CustomerManageronlineaccounts = {
  method: z.literal("POST"),
  path: z.literal("/CustomerManager/onlineaccounts"),
  requestFormat: z.literal("json"),
  parameters: z.object({
    body: CustomerOnlineAccountsQuery,
  }),
  response: z.array(OnlineAccountOutputDto),
};

export type get_CustomerManagermainmachineaccountsCif = typeof get_CustomerManagermainmachineaccountsCif;
export const get_CustomerManagermainmachineaccountsCif = {
  method: z.literal("GET"),
  path: z.literal("/CustomerManager/mainmachineaccounts/{cif}"),
  requestFormat: z.literal("json"),
  parameters: z.object({
    path: z.object({
      cif: z.number(),
    }),
  }),
  response: z.array(CustomerAccountByCifFromMainMachineOutputDto),
};

export type post_CustomerManagergetSpecificClaimUsers = typeof post_CustomerManagergetSpecificClaimUsers;
export const post_CustomerManagergetSpecificClaimUsers = {
  method: z.literal("POST"),
  path: z.literal("/CustomerManager/getSpecificClaimUsers"),
  requestFormat: z.literal("json"),
  parameters: z.object({
    body: GetSpecificClaimUsersQuery,
  }),
  response: GetSpecificClaimUsersOutputDtoPagedListDto,
};

export type get_CustomerManagercustomerofflineinfoCifNo = typeof get_CustomerManagercustomerofflineinfoCifNo;
export const get_CustomerManagercustomerofflineinfoCifNo = {
  method: z.literal("GET"),
  path: z.literal("/CustomerManager/customerofflineinfo/{cifNo}"),
  requestFormat: z.literal("json"),
  parameters: z.object({
    path: z.object({
      cifNo: z.number(),
    }),
  }),
  response: CustomerTotalInfoOutputDto,
};

export type post_CustomerManageraddaliastocustomer = typeof post_CustomerManageraddaliastocustomer;
export const post_CustomerManageraddaliastocustomer = {
  method: z.literal("POST"),
  path: z.literal("/CustomerManager/addaliastocustomer"),
  requestFormat: z.literal("json"),
  parameters: z.object({
    body: AddAliasCommand,
  }),
  response: AddAliasOutputDto,
};

export type post_CustomerManagerregisterib = typeof post_CustomerManagerregisterib;
export const post_CustomerManagerregisterib = {
  method: z.literal("POST"),
  path: z.literal("/CustomerManager/registerib"),
  requestFormat: z.literal("json"),
  parameters: z.object({
    body: RegisterIBCommand,
  }),
  response: z.boolean(),
};

export type post_CustomerManagerdevicevalidationib = typeof post_CustomerManagerdevicevalidationib;
export const post_CustomerManagerdevicevalidationib = {
  method: z.literal("POST"),
  path: z.literal("/CustomerManager/devicevalidationib"),
  requestFormat: z.literal("json"),
  parameters: z.object({
    body: DeviceValidationIBQuery,
  }),
  response: DeviceValidationIBOutputDto,
};

// <EndpointByMethod>
export const EndpointByMethod = {
  post: {
    "/customer-management/BanRule/add": post_CustomerManagementBanRuleadd,
    "/customer-management/BanRule/remove": post_CustomerManagementBanRuleremove,
    "/customer-management/BanRule/update": post_CustomerManagementBanRuleupdate,
    "/customer-management/BanRule/get": post_CustomerManagementBanRuleget,
    "/customer-management/BanRule/addBanRulePerson": post_CustomerManagementBanRuleaddBanRulePerson,
    "/customer-management/BanRule/removeBanRulePerson": post_CustomerManagementBanRuleremoveBanRulePerson,
    "/customer-management/BanRule/getBanRulePersons": post_CustomerManagementBanRulegetBanRulePersons,
    "/customer-management/BanRule/checkbanruleperson": post_CustomerManagementBanRulecheckbanruleperson,
    "/customer-management/BanRule/addActorLevel": post_CustomerManagementBanRuleaddActorLevel,
    "/customer-management/BanRule/removeActorLevel": post_CustomerManagementBanRuleremoveActorLevel,
    "/customer-management/BanRule/getActorLevels": post_CustomerManagementBanRulegetActorLevels,
    "/customer-management/City/add": post_CustomerManagementCityadd,
    "/customer-management/City/remove": post_CustomerManagementCityremove,
    "/customer-management/City/update": post_CustomerManagementCityupdate,
    "/customer-management/City/get": post_CustomerManagementCityget,
    "/customer-management/FrequentlyUsedData/upsert": post_CustomerManagementFrequentlyUsedDataupsert,
    "/customer-management/FrequentlyUsedData/increaseusage": post_CustomerManagementFrequentlyUsedDataincreaseusage,
    "/customer-management/FrequentlyUsedData/remove": post_CustomerManagementFrequentlyUsedDataremove,
    "/customer-management/FrequentlyUsedData/GetData": post_CustomerManagementFrequentlyUsedDataGetData,
    "/customer-management/Profile/savedestinationaccount": post_CustomerManagementProfilesavedestinationaccount,
    "/customer-management/Profile/savedestinationcard": post_CustomerManagementProfilesavedestinationcard,
    "/customer-management/ScheduledTask/get": post_CustomerManagementScheduledTaskget,
    "/customer-management/ScheduledTask/getArchive": post_CustomerManagementScheduledTaskgetArchive,
    "/customer-management/SettingDrafts/addsettingdraft": post_CustomerManagementSettingDraftsaddsettingdraft,
    "/customer-management/SettingDrafts/approvesettingdraft": post_CustomerManagementSettingDraftsapprovesettingdraft,
    "/customer-management/SettingDrafts/deletesettingdraft": post_CustomerManagementSettingDraftsdeletesettingdraft,
    "/customer-management/SettingDrafts/editsettingdraft": post_CustomerManagementSettingDraftseditsettingdraft,
    "/customer-management/SettingDrafts/rejectsettingdraft": post_CustomerManagementSettingDraftsrejectsettingdraft,
    "/customer-management/SettingDrafts/getallsettings": post_CustomerManagementSettingDraftsgetallsettings,
    "/customer-management/Settings/settings": post_CustomerManagementSettingssettings,
    "/customer-management/Settings/upsert": post_CustomerManagementSettingsupsert,
    "/customer-management/Settings/delete": post_CustomerManagementSettingsdelete,
    "/customer-management/UserSetting/add": post_CustomerManagementUserSettingadd,
    "/customer-management/VirtualCustomer/createcustomer": post_CustomerManagementVirtualCustomercreatecustomer,
    "/CustomerManager/preregister": post_CustomerManagerpreregister,
    "/CustomerManager/verifyregisterotp": post_CustomerManagerverifyregisterotp,
    "/CustomerManager/register": post_CustomerManagerregister,
    "/CustomerManager/devicevalidation": post_CustomerManagerdevicevalidation,
    "/CustomerManager/currentaccounts": post_CustomerManagercurrentaccounts,
    "/CustomerManager/cards": post_CustomerManagercards,
    "/CustomerManager/relatetoacccustomres": post_CustomerManagerrelatetoacccustomres,
    "/CustomerManager/updateaccountandcards": post_CustomerManagerupdateaccountandcards,
    "/CustomerManager/updateaccounts": post_CustomerManagerupdateaccounts,
    "/CustomerManager/updatecards": post_CustomerManagerupdatecards,
    "/CustomerManager/checkcustomeraccounts": post_CustomerManagercheckcustomeraccounts,
    "/CustomerManager/checkcustomercard": post_CustomerManagercheckcustomercard,
    "/CustomerManager/deletecard": post_CustomerManagerdeletecard,
    "/CustomerManager/deleteaccount": post_CustomerManagerdeleteaccount,
    "/CustomerManager/addcard": post_CustomerManageraddcard,
    "/CustomerManager/addaccount": post_CustomerManageraddaccount,
    "/CustomerManager/requestzerolevel": post_CustomerManagerrequestzerolevel,
    "/CustomerManager/checkotpzerolevel": post_CustomerManagercheckotpzerolevel,
    "/CustomerManager/confirmzerolevel": post_CustomerManagerconfirmzerolevel,
    "/CustomerManager/requestupgradeleveltwo": post_CustomerManagerrequestupgradeleveltwo,
    "/CustomerManager/confirmupgradeleveltwo": post_CustomerManagerconfirmupgradeleveltwo,
    "/CustomerManager/reqotpleveltwobeforelogin": post_CustomerManagerreqotpleveltwobeforelogin,
    "/CustomerManager/leveluptwobeforelogin": post_CustomerManagerleveluptwobeforelogin,
    "/CustomerManager/iscustomerownerofaccount": post_CustomerManageriscustomerownerofaccount,
    "/CustomerManager/internetbankcreateuser": post_CustomerManagerinternetbankcreateuser,
    "/CustomerManager/getcustomertoken": post_CustomerManagergetcustomertoken,
    "/CustomerManager/deactivatecustomerstart": post_CustomerManagerdeactivatecustomerstart,
    "/CustomerManager/deactivatecustomermobilematching": post_CustomerManagerdeactivatecustomermobilematching,
    "/CustomerManager/sendotptodeactivatecustomer": post_CustomerManagersendotptodeactivatecustomer,
    "/CustomerManager/deactivatecustomerinallchannels": post_CustomerManagerdeactivatecustomerinallchannels,
    "/CustomerManager/updatefacilityaccounts": post_CustomerManagerupdatefacilityaccounts,
    "/CustomerManager/checkcardvalidforactivation": post_CustomerManagercheckcardvalidforactivation,
    "/CustomerManager/isfacilityaccountbelongtocustomer": post_CustomerManagerisfacilityaccountbelongtocustomer,
    "/CustomerManager/deacnationalcodematching": post_CustomerManagerdeacnationalcodematching,
    "/CustomerManager/addpresentercode": post_CustomerManageraddpresentercode,
    "/CustomerManager/getadminallcustomers": post_CustomerManagergetadminallcustomers,
    "/CustomerManager/getadmincustomerdetail": post_CustomerManagergetadmincustomerdetail,
    "/CustomerManager/AddOrganizationClaimToUser": post_CustomerManagerAddOrganizationClaimToUser,
    "/CustomerManager/inquirypresentercode": post_CustomerManagerinquirypresentercode,
    "/CustomerManager/removeorganizationclaimsforuser": post_CustomerManagerremoveorganizationclaimsforuser,
    "/CustomerManager/addaccountsigngranted": post_CustomerManageraddaccountsigngranted,
    "/CustomerManager/getaccountsbysigngranted": post_CustomerManagergetaccountsbysigngranted,
    "/CustomerManager/internalupdatecards": post_CustomerManagerinternalupdatecards,
    "/CustomerManager/sabtahvalinquiry": post_CustomerManagersabtahvalinquiry,
    "/CustomerManager/shahkarinquiry": post_CustomerManagershahkarinquiry,
    "/CustomerManager/nahabinquiry": post_CustomerManagernahabinquiry,
    "/CustomerManager/sanainquiry": post_CustomerManagersanainquiry,
    "/CustomerManager/islegalrelatedcustomerrelationexist": post_CustomerManagerislegalrelatedcustomerrelationexist,
    "/CustomerManager/onlineaccounts": post_CustomerManageronlineaccounts,
    "/CustomerManager/getSpecificClaimUsers": post_CustomerManagergetSpecificClaimUsers,
    "/CustomerManager/addaliastocustomer": post_CustomerManageraddaliastocustomer,
    "/CustomerManager/registerib": post_CustomerManagerregisterib,
    "/CustomerManager/devicevalidationib": post_CustomerManagerdevicevalidationib,
  },
  get: {
    "/customer-management/BanRule/getPersonBanRuleList/{nationalID}":
      get_CustomerManagementBanRulegetPersonBanRuleListNationalID,
    "/customer-management/FrequentlyUsedData/GetSources": get_CustomerManagementFrequentlyUsedDataGetSources,
    "/customer-management/NonAttendanceLoan/getloantoken/{email}":
      get_CustomerManagementNonAttendanceLoangetloantokenEmail,
    "/customer-management/Profile/getProfiles": get_CustomerManagementProfilegetProfiles,
    "/customer-management/Profile/getappname": get_CustomerManagementProfilegetappname,
    "/customer-management/Users/version": get_CustomerManagementUsersversion,
    "/customer-management/Users/healthstatus": get_CustomerManagementUsershealthstatus,
    "/customer-management/UserSetting/getSettings/{lastGetToken}":
      get_CustomerManagementUserSettinggetSettingsLastGetToken,
    "/CustomerManager/accounts/{cifNo}/{channel}": get_CustomerManageraccountsCifNoChannel,
    "/CustomerManager/accounts": get_CustomerManageraccounts,
    "/CustomerManager/currentaccounts": get_CustomerManagercurrentaccounts,
    "/CustomerManager/cards/{cifNo}/{channel}": get_CustomerManagercardsCifNoChannel,
    "/CustomerManager/cards": get_CustomerManagercards,
    "/CustomerManager/accountsandcards/{cifNo}/{channel}": get_CustomerManageraccountsandcardsCifNoChannel,
    "/CustomerManager/accountsandcards": get_CustomerManageraccountsandcards,
    "/CustomerManager/customercompleteinfo/{cifNo}": get_CustomerManagercustomercompleteinfoCifNo,
    "/CustomerManager/customercompleteinfobyssn/{ssn}": get_CustomerManagercustomercompleteinfobyssnSsn,
    "/CustomerManager/getfacilityaccounts": get_CustomerManagergetfacilityaccounts,
    "/CustomerManager/getpresentcode": get_CustomerManagergetpresentcode,
    "/CustomerManager/getaccountsbysigngranted": get_CustomerManagergetaccountsbysigngranted,
    "/CustomerManager/getallrelatedcustomers/{service}": get_CustomerManagergetallrelatedcustomersService,
    "/CustomerManager/getaddress": get_CustomerManagergetaddress,
    "/CustomerManager/getlegalrelatedcustomers": get_CustomerManagergetlegalrelatedcustomers,
    "/CustomerManager/mainmachineaccounts/{cif}": get_CustomerManagermainmachineaccountsCif,
    "/CustomerManager/customerofflineinfo/{cifNo}": get_CustomerManagercustomerofflineinfoCifNo,
  },
};
export type EndpointByMethod = typeof EndpointByMethod;
// </EndpointByMethod>

// <EndpointByMethod.Shorthands>
export type PostEndpoints = EndpointByMethod["post"];
export type GetEndpoints = EndpointByMethod["get"];
export type AllEndpoints = EndpointByMethod[keyof EndpointByMethod];
// </EndpointByMethod.Shorthands>

// <ApiClientTypes>
export type EndpointParameters = {
  body?: unknown;
  query?: Record<string, unknown>;
  header?: Record<string, unknown>;
  path?: Record<string, unknown>;
};

export type MutationMethod = "post" | "put" | "patch" | "delete";
export type Method = "get" | "head" | MutationMethod;

type RequestFormat = "json" | "form-data" | "form-url" | "binary" | "text";

export type DefaultEndpoint = {
  parameters?: EndpointParameters | undefined;
  response: unknown;
};

export type Endpoint<TConfig extends DefaultEndpoint = DefaultEndpoint> = {
  operationId: string;
  method: Method;
  path: string;
  requestFormat: RequestFormat;
  parameters?: TConfig["parameters"];
  meta: {
    alias: string;
    hasParameters: boolean;
    areParametersRequired: boolean;
  };
  response: TConfig["response"];
};

type Fetcher = (
  method: Method,
  url: string,
  parameters?: EndpointParameters | undefined,
) => Promise<Endpoint["response"]>;

type RequiredKeys<T> = {
  [P in keyof T]-?: undefined extends T[P] ? never : P;
}[keyof T];

type MaybeOptionalArg<T> = RequiredKeys<T> extends never ? [config?: T] : [config: T];

