/* eslint-disable react-native/no-raw-text */
import React, { FunctionComponent, useCallback, useState } from 'react'
import { Alert, Button, ScrollView, Text, View } from 'react-native'
import QRCode from 'react-native-qrcode-svg'
import styled from 'styled-components/native'

import { CallToActionIcon, CategoryIdEnum, PopOverIcon, VenueTypeCodeKey } from 'api/gen/api'
import { SIGNUP_NUMBER_OF_STEPS } from 'features/auth/api'
import { ThreeShapesTicket } from 'features/bookings/components/ThreeShapesTicket'
import { Icons } from 'features/cheatcodes/pages/AppComponents/Icons'
import { Illustrations } from 'features/cheatcodes/pages/AppComponents/Illustrations'
import { CulturalSurveyCheckbox } from 'features/culturalSurvey/components/CulturalSurveyCheckbox'
import { CulturalSurveyProgressBar } from 'features/culturalSurvey/components/CulturalSurveyProgressBar'
import { VenueTile } from 'features/home/atoms/VenueTile'
import { HeroButtonList } from 'features/identityCheck/components/HeroButtonList'
import { SubscriptionMessageBadge } from 'features/profile/components/Badges/SubscriptionMessageBadge'
import { CreditHeader } from 'features/profile/components/Header/CreditHeader/CreditHeader'
import { NonBeneficiaryHeader } from 'features/profile/components/Header/NonBeneficiaryHeader/NonBeneficiaryHeader'
import { domains_credit_v1 } from 'features/profile/fixtures/domainsCredit'
import { SelectionLabel } from 'features/search/atoms/SelectionLabel'
import { mockVenues } from 'libs/algolia/mockedResponses/mockedVenues'
import { MAP_CATEGORY_ID_TO_ICON } from 'libs/parsers'
import { AccordionItem } from 'ui/components/AccordionItem'
import { Badge } from 'ui/components/Badge'
import { Banner } from 'ui/components/Banner'
import { AnimatedProgressBar } from 'ui/components/bars/AnimatedProgressBar'
import { ButtonInsideText } from 'ui/components/buttons/buttonInsideText/ButtonInsideText'
import { ButtonPrimary } from 'ui/components/buttons/ButtonPrimary'
import { ButtonPrimaryWhite } from 'ui/components/buttons/ButtonPrimaryWhite'
import { ButtonQuaternary } from 'ui/components/buttons/ButtonQuaternary'
import { ButtonQuaternaryBlack } from 'ui/components/buttons/ButtonQuaternaryBlack'
import { ButtonSecondary } from 'ui/components/buttons/ButtonSecondary'
import { ButtonTertiary } from 'ui/components/buttons/ButtonTertiary'
import { ButtonTertiaryWhite } from 'ui/components/buttons/ButtonTertiaryWhite'
import { ButtonWithLinearGradient } from 'ui/components/buttons/ButtonWithLinearGradient'
import { ExternalLink } from 'ui/components/buttons/externalLink/ExternalLink'
import { ClippedTag } from 'ui/components/ClippedTag'
import { Emoji } from 'ui/components/Emoji'
import FilterSwitch from 'ui/components/FilterSwitch'
import { PageHeader } from 'ui/components/headers/PageHeader'
import { Hero } from 'ui/components/hero/Hero'
import { ImagePlaceholder } from 'ui/components/ImagePlaceholder'
import { LargeTextInput } from 'ui/components/inputs/LargeTextInput'
import { PasswordInput } from 'ui/components/inputs/PasswordInput'
import { InputRule } from 'ui/components/inputs/rules/InputRule'
import { SearchInput } from 'ui/components/inputs/SearchInput'
import { Slider } from 'ui/components/inputs/Slider'
import { TextInput } from 'ui/components/inputs/TextInput'
import { AppModal } from 'ui/components/modals/AppModal'
import { ModalHeader } from 'ui/components/modals/ModalHeader'
import { useModal } from 'ui/components/modals/useModal'
import { RadioButton } from 'ui/components/radioButtons/RadioButton'
import { RadioButtonWithBorder } from 'ui/components/radioButtons/RadioButtonWithBorder'
import { SectionRow } from 'ui/components/SectionRow'
import { SectionWithDivider } from 'ui/components/SectionWithDivider'
import { SlantTag } from 'ui/components/SlantTag'
import { useSnackBarContext } from 'ui/components/snackBar/SnackBarContext'
import { StepDots } from 'ui/components/StepDots'
import { OfferImage } from 'ui/components/tiles/OfferImage'
import { TouchableOpacity } from 'ui/components/TouchableOpacity'
import { BackgroundPlaceholder } from 'ui/svg/BackgroundPlaceholder'
import { ArrowPrevious } from 'ui/svg/icons/ArrowPrevious'
import { culturalSurveyIcons } from 'ui/svg/icons/bicolor/exports/culturalSurveyIcons'
import { VideoGame } from 'ui/svg/icons/bicolor/VideoGame'
import { BicolorSmartphone } from 'ui/svg/icons/BicolorSmartphone'
import { Check } from 'ui/svg/icons/Check'
import { Close } from 'ui/svg/icons/Close'
import { Email } from 'ui/svg/icons/Email'
import { ExternalSite } from 'ui/svg/icons/ExternalSite'
import { ExternalSiteFilled } from 'ui/svg/icons/ExternalSiteFilled'
import { MagnifyingGlass } from 'ui/svg/icons/MagnifyingGlass'
import { Rectangle } from 'ui/svg/Rectangle'
import { getSpacing, LENGTH_S, Spacer, Typo } from 'ui/theme'

function onButtonPress() {
  Alert.alert('you pressed it')
}

const THIS_YEAR = new Date().getFullYear()
const imageUrl =
  'https://img-19.ccm2.net/8vUCl8TXZfwTt7zAOkBkuDRHiT8=/1240x/smart/b829396acc244fd484c5ddcdcb2b08f3/ccmcms-commentcamarche/20494859.jpg'

const radioButtonItems = [
  { label: 'Default' },
  { label: 'With description', description: 'This is a description' },
  { label: 'With icon', icon: VideoGame },
  { label: 'With icon and description', icon: Email, description: 'This is a description' },
]

const radioButtonWithBorderItems = [
  { label: 'Default 2' },
  { label: 'With description 2', description: 'This is a description 2' },
  { label: 'Default 3' },
]

const startText = 'Lorem ipsum '
const endText = ' sit amet adipisicing elit.'

export const AppComponents: FunctionComponent = () => {
  const {
    visible: basicModalVisible,
    showModal: showBasicModal,
    hideModal: hideBasicModal,
  } = useModal(false)
  const [buttonIsLoading, setButtonIsLoading] = useState(false)
  const [inputText, setInputText] = useState('')
  const [largeInputText, setLargeInputText] = useState('')
  const [currentStep, setCurrentStep] = useState(1)
  const [year, setYear] = useState(THIS_YEAR - 18)
  const [radioButtonChoice, setRadioButtonChoice] = useState('')
  const [popOverIconString, setPopOverIconString] = useState<string>()
  const [callToActionIconString, setCallToActionIconString] = useState<string>()
  const [callToActionTitle, setCallToActionTitle] = useState<string>()
  const [callToActionLink, setCallToActionLink] = useState<string>()

  const onTriggerFakeLoading = useCallback(() => {
    setButtonIsLoading(true)
    setTimeout(() => setButtonIsLoading(false), 3000)
  }, [])

  return (
    <React.Fragment>
      <PageHeader title="App components" withGoBackButton />
      <StyledScrollView>
        <Divider />

        {/* Typos */}
        <AccordionItem title="Typos">
          <Typo.Hero>Hero</Typo.Hero>
          <Typo.Title1>Title 1</Typo.Title1>
          <Typo.Title2>Title 2</Typo.Title2>
          <Typo.Title3>Title 3</Typo.Title3>
          <Typo.Title4>Title 4</Typo.Title4>
          <Typo.Body>This is a body</Typo.Body>
          <Typo.ButtonText>This is a button text</Typo.ButtonText>
          <Typo.Caption>This is a caption</Typo.Caption>
        </AccordionItem>

        <Divider />

        {/* Buttons */}
        <AccordionItem title="Buttons">
          {/* Buttons: Primary */}
          <Typo.Title4>Button - Theme Primary</Typo.Title4>
          <Spacer.Column numberOfSpaces={1} />
          <ButtonPrimary
            wording="Longpress to see"
            onPress={onButtonPress}
            onLongPress={onTriggerFakeLoading}
            icon={Email}
            isLoading={buttonIsLoading}
          />
          <Spacer.Column numberOfSpaces={1} />
          <ButtonPrimary wording="Disabled" onPress={onButtonPress} icon={Email} disabled />
          <Spacer.Column numberOfSpaces={2} />
          {/* Buttons: White Primary */}
          <Typo.Title4>Button - White Primary Secondary</Typo.Title4>
          <Spacer.Column numberOfSpaces={1} />
          <ButtonPrimaryWhite
            wording="White button"
            onPress={onTriggerFakeLoading}
            isLoading={buttonIsLoading}
            icon={Email}
          />
          <Spacer.Column numberOfSpaces={1} />
          <ButtonPrimaryWhite wording="Disabled" onPress={onButtonPress} icon={Email} disabled />
          <Spacer.Column numberOfSpaces={2} />
          {/* Buttons: Secondary */}
          <Typo.Title4>Button - Theme Secondary</Typo.Title4>
          <Spacer.Column numberOfSpaces={1} />
          <ButtonSecondary
            wording="Triggers all active buttons"
            icon={Email}
            isLoading={buttonIsLoading}
            onPress={onTriggerFakeLoading}
          />
          <Spacer.Column numberOfSpaces={1} />
          <ButtonSecondary wording="Disabled" icon={Email} disabled onPress={onButtonPress} />
          <Spacer.Column numberOfSpaces={2} />
          {/* Buttons: Tertiary */}
          <Typo.Title4>Button - Theme Tertiary</Typo.Title4>
          <Spacer.Column numberOfSpaces={1} />
          <ButtonTertiary
            wording="Triggers all active buttons"
            icon={Close}
            isLoading={buttonIsLoading}
            onPress={onTriggerFakeLoading}
          />
          <Spacer.Column numberOfSpaces={1} />
          <ButtonTertiary wording="Disabled" onPress={onButtonPress} icon={Close} disabled />
          <Spacer.Column numberOfSpaces={1} />
          <ButtonTertiaryWhite
            wording="White tertiary button"
            icon={Email}
            isLoading={buttonIsLoading}
            onPress={onTriggerFakeLoading}
          />
          <Spacer.Column numberOfSpaces={2} />
          {/* Buttons: Quaternary */}
          <Typo.Title4>Button - Theme Quaternary</Typo.Title4>
          <Spacer.Column numberOfSpaces={1} />
          <ButtonQuaternary
            wording="Triggers all active buttons"
            icon={Email}
            isLoading={buttonIsLoading}
            onPress={onTriggerFakeLoading}
          />
          <Spacer.Column numberOfSpaces={1} />
          <ButtonQuaternary wording="Se connecter" onPress={onButtonPress} icon={Email} disabled />
          <ButtonQuaternaryBlack wording="Se connecter" onPress={onButtonPress} icon={Email} />
          {/* Buttons: With linear gradient */}
          <Typo.Title4>Button - With linear gradient</Typo.Title4>
          <Spacer.Column numberOfSpaces={1} />
          <ButtonWithLinearGradient wording="CallToAction" onPress={onButtonPress} />
          <Spacer.Column numberOfSpaces={1} />
          <ButtonWithLinearGradient
            wording="CallToAction external"
            onPress={onButtonPress}
            icon={ExternalSite}
          />
          <Spacer.Column numberOfSpaces={1} />
          <ButtonWithLinearGradient
            wording="Disabled CallToAction"
            onPress={onButtonPress}
            isDisabled
          />
          {/* Buttons: ButtonInsideText */}
          <Typo.Title4>Button - ButtonInsideText</Typo.Title4>
          <Spacer.Column numberOfSpaces={1} />
          <Typo.Body>
            {startText}
            <ButtonInsideText wording="default" />
            {endText}
          </Typo.Body>
          <Spacer.Column numberOfSpaces={2} />
          <Typo.Body>
            {startText}
            <ButtonInsideText wording="default with icon" icon={ExternalSiteFilled} />
            {endText}
          </Typo.Body>
          <Spacer.Column numberOfSpaces={2} />
          <Typo.Caption>
            {startText}
            <ButtonInsideText wording="caption" typography="Caption" />
            {endText}
          </Typo.Caption>
          <Spacer.Column numberOfSpaces={2} />
          <Typo.Caption>
            {startText}
            <ButtonInsideText
              wording="caption with icon"
              typography="Caption"
              icon={ExternalSiteFilled}
            />
            {endText}
          </Typo.Caption>
        </AccordionItem>

        <Divider />

        {/* Heros */}
        <AccordionItem title="Heros">
          <Typo.Title4>Default Hero - Offer</Typo.Title4>
          <Spacer.Column numberOfSpaces={1} />
          <Hero imageUrl={undefined} type="offer" categoryId={CategoryIdEnum.CINEMA} />
          <Typo.Title4>Default Hero - Venue</Typo.Title4>
          <Spacer.Column numberOfSpaces={1} />
          <Hero imageUrl={undefined} type="venue" venueType={VenueTypeCodeKey.ARTISTIC_COURSE} />
          <Spacer.Column numberOfSpaces={4} />
          <Typo.Title4>Landscape Hero - Venue with image</Typo.Title4>
          <Spacer.Column numberOfSpaces={1} />
          <Hero imageUrl={imageUrl} type="venue" venueType={VenueTypeCodeKey.ARTISTIC_COURSE} />
        </AccordionItem>

        <Divider />

        {/* Tags */}
        <AccordionItem title="Tags">
          <ClippedTag label="Musée du Louvre" onPress={onButtonPress} testId="Enlever le lieu" />
          <Spacer.Column numberOfSpaces={getSpacing(2)} />
          <Text>
            The text in SlantTag is always straight. Developers should play on slantAngle to include
            whole text in tag
          </Text>
          <SlantTag text={'Tag adapts to container size'} slantAngle={-2} />
          <Spacer.Column numberOfSpaces={getSpacing(2)} />
          <AlignedText>
            <SlantTag text={'Tag adapts'} />
            <Spacer.Flex flex={0.3} />
            <SlantTag text={'Tag adapts'} />
          </AlignedText>
          <AlignedText>
            <SlantTag text={'given angle'} slantAngle={-10} />
            <Spacer.Flex flex={0.3} />
            <SlantTag text={'Tag with fixed dimensions'} width={getSpacing(10)} />
          </AlignedText>
        </AccordionItem>

        <Divider />

        {/* ImagePlaceholder */}
        <AccordionItem title="ImagePlaceholder">
          <StyledImagePlaceholder />
        </AccordionItem>

        <Divider />

        {/* Modals */}
        <AccordionItem title="Modals">
          <TouchableOpacity onPress={showBasicModal}>
            <StyledTitle4>Modal - Basic</StyledTitle4>
          </TouchableOpacity>
          <AppModal
            title="a basic modal"
            visible={basicModalVisible}
            leftIconAccessibilityLabel="leftIconButton"
            leftIcon={ArrowPrevious}
            onLeftIconPress={hideBasicModal}
            rightIconAccessibilityLabel="rightIconButton"
            rightIcon={Close}
            onRightIconPress={hideBasicModal}>
            <Text>A simple content</Text>
          </AppModal>
          <Spacer.Column numberOfSpaces={1} />
          <Typo.Title4>Modal - Progressive</Typo.Title4>
          <Spacer.Column numberOfSpaces={1} />
          <Typo.Title4>Modal Header</Typo.Title4>
          <ModalHeader
            title="My modal header"
            leftIconAccessibilityLabel="Revenir en arrière"
            leftIcon={ArrowPrevious}
            onLeftIconPress={() => null}
            rightIconAccessibilityLabel="Revenir à l'accueil"
            rightIcon={Close}
            onRightIconPress={() => null}
          />
        </AccordionItem>

        <Divider />

        {/* Sections */}
        <AccordionItem title="Sections">
          <SectionWithDivider visible margin>
            <View>
              <Typo.Title4>Section with divider</Typo.Title4>
              <Typo.Body>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Cupiditate quas aut
                laborum, dolor sapiente quos doloribus sequi reprehenderit ullam porro rem corrupti
                libero repellendus nam vel suscipit consequuntur blanditiis omnis.
              </Typo.Body>
            </View>
          </SectionWithDivider>
        </AccordionItem>

        <Divider />

        {/* Switches */}
        <AccordionItem title="Switches">
          <FilterSwitchesSection />
        </AccordionItem>

        <Divider />

        {/* Icons */}
        <AccordionItem title="Icons">
          <Icons />
        </AccordionItem>

        <Divider />

        {/* Illustrations */}
        <AccordionItem title="Illustrations">
          <Illustrations />
        </AccordionItem>

        <Divider />

        {/* Inputs */}
        <AccordionItem title="Inputs">
          <StyledTitle4>Text Input</StyledTitle4>
          <TextInput value={inputText} onChangeText={setInputText} placeholder={'Placeholder'} />
          <Spacer.Column numberOfSpaces={1} />
          <StyledInputRule
            title={'12 Caractères'}
            icon={inputText.length >= 12 ? Check : Close}
            isValid={inputText.length >= 12}
          />
          <Spacer.Column numberOfSpaces={1} />
          <StyledTitle4>Text Input - Email</StyledTitle4>
          <TextInput
            autoCapitalize="none"
            keyboardType="email-address"
            onChangeText={doNothingFn}
            placeholder={'Placeholder'}
            value=""
          />
          <Spacer.Column numberOfSpaces={1} />
          <StyledTitle4>Text Input - Error</StyledTitle4>
          <TextInput
            value=""
            onChangeText={doNothingFn}
            placeholder={'Placeholder'}
            isError={true}
          />
          <Spacer.Column numberOfSpaces={1} />
          <StyledTitle4>Password Input</StyledTitle4>
          <PasswordInput value="" onChangeText={doNothingFn} placeholder={'Placeholder'} />
          <Spacer.Column numberOfSpaces={1} />
          <StyledTitle4>Large input</StyledTitle4>
          <Spacer.Column numberOfSpaces={1} />
          <LargeTextInput value={largeInputText} onChangeText={setLargeInputText} maxLength={200} />
        </AccordionItem>

        <Divider />

        {/* SnackBar */}
        <AccordionItem title="SnackBar">
          <SnackBars />
        </AccordionItem>

        <Divider />

        {/* Search components */}
        <AccordionItem title="Search components">
          <SearchInput LeftIcon={() => <MagnifyingGlass />} placeholder="with left icon" />
          <Spacer.Column numberOfSpaces={4} />
          <Center>
            <Slider values={[0, 75]} max={300} showValues formatValues={(n) => `${n} €`} />
            <Slider values={[50]} showValues formatValues={(n) => `${n} km`} />
            <Spacer.Column numberOfSpaces={4} />
            <ExampleSwitch />
            <Spacer.Column numberOfSpaces={4} />
          </Center>
          <RowWrap>
            <Label label="Cinéma" />
            <Label label="Musique" />
            <Label label="Exposition" />
          </RowWrap>
        </AccordionItem>

        <Divider />

        {/* Banner components */}
        <AccordionItem title="Banners">
          <AlignedText>
            <Banner title="Je suis une bannière" />
          </AlignedText>
        </AccordionItem>

        <Divider />

        <AccordionItem title="Radio buttons">
          <StyledTitle4>RadioButton</StyledTitle4>
          <Spacer.Column numberOfSpaces={1} />
          <React.Fragment>
            {radioButtonItems.map((item) => {
              return (
                <View key={item.label}>
                  <RadioButton
                    onSelect={() => setRadioButtonChoice(item.label)}
                    isSelected={radioButtonChoice === item.label}
                    {...item}
                  />
                  <Spacer.Column numberOfSpaces={3} />
                </View>
              )
            })}
          </React.Fragment>

          <Spacer.Column numberOfSpaces={3} />

          <StyledTitle4>RadioButtonWithBorder</StyledTitle4>
          <Spacer.Column numberOfSpaces={1} />
          <React.Fragment>
            {radioButtonWithBorderItems.map((item) => {
              return (
                <View key={item.label}>
                  <RadioButtonWithBorder
                    onPress={() => setRadioButtonChoice(item.label)}
                    selected={radioButtonChoice === item.label}
                    {...item}
                  />
                  <Spacer.Column numberOfSpaces={3} />
                </View>
              )
            })}
          </React.Fragment>
        </AccordionItem>

        <Divider />

        {/* Profile components */}
        <AccordionItem title="Profile components">
          <View>
            <Text> Hero Button List </Text>
            <Spacer.Column numberOfSpaces={3} />
            <HeroButtonList
              Title={
                <Text>
                  <Typo.Body>J’ai ma pièce d’identité </Typo.Body>
                  <Typo.ButtonText>en cours de validité avec moi</Typo.ButtonText>
                </Text>
              }
              Subtitle={
                <Typo.Caption>
                  <Emoji.Warning withSpaceAfter />
                  Les copies ne sont pas acceptées
                </Typo.Caption>
              }
              onPress={() => null}
              icon={BicolorSmartphone}
            />
            <Spacer.Column numberOfSpaces={1} />
            <HeroButtonList
              Title={
                <Text>
                  <Typo.Body>J’ai une carte d’identité, un passeport </Typo.Body>
                  <Typo.ButtonText>étranger</Typo.ButtonText>
                  <Typo.Body> ou un titre séjour français</Typo.Body>
                </Text>
              }
              onPress={() => null}
              icon={BicolorSmartphone}
            />
          </View>
          <Spacer.Column numberOfSpaces={1} />
          <GreyView>
            <Spacer.Column numberOfSpaces={1} />
            <Text> Progress bars </Text>
            <Spacer.Column numberOfSpaces={3} />
            <View>
              <ValidProgressBar />
              <PrimaryDarkProgressBar />
              <SecondaryProgressBar />
            </View>
            <Spacer.Column numberOfSpaces={1} />
            <View>
              <PrimaryProgressBar />
              <TertiaryProgressBar />
            </View>
          </GreyView>
          <Spacer.Column numberOfSpaces={4} />
          <GreyView>
            <Text> Cultural Survey progress bars </Text>
            <Spacer.Column numberOfSpaces={3} />
            <CulturalSurveyProgressBar progress={0.2} />
            <CulturalSurveyProgressBar progress={0.5} />
            <CulturalSurveyProgressBar progress={1} />
          </GreyView>
          <Spacer.Column numberOfSpaces={4} />
          <View>
            <CulturalSurveyCheckbox
              selected={false}
              onPress={() => null}
              title={'Aucune de ces activités'}
            />
            <Spacer.Column numberOfSpaces={1} />
            <CulturalSurveyCheckbox
              selected={true}
              title={'Visité un musée,'}
              subtitle={'une canne à pêche'}
              onPress={() => null}
              icon={culturalSurveyIcons.Museum}
            />
          </View>
          <Spacer.Column numberOfSpaces={4} />
          <View>
            <Text>Section Row </Text>
            <SectionRow
              type="navigable"
              title="navigable"
              icon={Email}
              navigateTo={{ screen: 'CheatCodes' }}
            />
            <SectionRow type="clickable" title="with CTA" icon={Email} cta={<ExampleSwitch />} />
            <SectionRow
              type="clickable"
              title="just clickable"
              icon={Email}
              onPress={() => Alert.alert('clicked')}
            />
          </View>
          <Spacer.Column numberOfSpaces={4} />
          <View>
            <NonBeneficiaryHeader
              eligibilityStartDatetime={`${year + 18}-01-28T00:00Z`}
              eligibilityEndDatetime={`${year + 19}-01-28T00:00Z`}
            />
          </View>
          <View>
            <AlignedText>
              <Text>Date de naissance: {year}-01-28</Text>
            </AlignedText>
            <AlignedText>
              <Button title="-1 an" onPress={() => setYear((y) => y + 1)} />
              <Spacer.Column numberOfSpaces={2} />
              <Text>{THIS_YEAR - year} ans</Text>
              <Spacer.Column numberOfSpaces={2} />
              <Button title="+1 an" onPress={() => setYear((y) => y - 1)} />
            </AlignedText>
          </View>
          <StyledTitle4>Communication InApp</StyledTitle4>
          <Text>Long texte</Text>
          <View>
            <SubscriptionMessageBadge
              subscriptionMessage={{
                callToAction: {
                  callToActionIcon: callToActionIconString as CallToActionIcon,
                  callToActionTitle,
                  callToActionLink,
                },
                popOverIcon: popOverIconString as PopOverIcon,
                userMessage: `Ceci est un très long message pour montrer que le texte est adaptatif est que ça ne posera aucun problème. Je suis sûr qu'on peut le rendre encore un peu plus long sans difficulté si on se creuse un peu les méninges`,
                updatedAt: `2021-10-25T13:24Z`,
              }}
            />
          </View>
          <Text>Affichage icône PopOverIcon</Text>
          <AlignedText>
            <Button title="Clock" onPress={() => setPopOverIconString('CLOCK')} />
            <Button title="Search" onPress={() => setPopOverIconString('MAGNIFYING_GLASS')} />
            <Button title="Warning" onPress={() => setPopOverIconString('WARNING')} />
            <Button title="Error" onPress={() => setPopOverIconString('ERROR')} />
          </AlignedText>
          <AlignedText>
            <Button title="File" onPress={() => setPopOverIconString('FILE')} />
            <Button title="No key" onPress={() => setPopOverIconString(undefined)} />
            <Button title="Unknown key" onPress={() => setPopOverIconString('Blablou')} />
          </AlignedText>
          <Text>Toggle CTA message and link</Text>
          <AlignedText>
            <Button
              title="CTA Message"
              onPress={() => {
                return callToActionTitle
                  ? setCallToActionTitle(undefined)
                  : setCallToActionTitle('Tu peux cliquer ici')
              }}
            />
          </AlignedText>
          <Text>CTA link</Text>
          <AlignedText>
            <Button title="None" onPress={() => setCallToActionLink(undefined)} />
            <Button title="External" onPress={() => setCallToActionLink('https://google.com')} />
            <Button title="Home" onPress={() => setCallToActionLink('passculture://home')} />
            <Button
              title="open mail"
              onPress={() => setCallToActionLink('passculture://openInbox')}
            />
          </AlignedText>
          <Text>Affichage icône CTA</Text>
          <AlignedText>
            <Button title="Email" onPress={() => setCallToActionIconString('EMAIL')} />
            <Button title="Retry" onPress={() => setCallToActionIconString('RETRY')} />
            <Button title="No key" onPress={() => setCallToActionIconString(undefined)} />
            <Button title="Unknown key" onPress={() => setCallToActionIconString('Blablou')} />
          </AlignedText>
        </AccordionItem>
        <Divider />
        {/* Your components */}
        <AccordionItem title="New Beneficiary Header">
          <CreditHeader
            firstName="Rosa"
            lastName="Bonheur"
            depositExpirationDate={'2022-02-16T17:16:04.735235'}
            domainsCredit={domains_credit_v1}
          />
        </AccordionItem>
        <Divider />

        {/* Your components */}
        <AccordionItem title="Your components">
          <AlignedText>
            <Text>
              <ExternalLink url="https://google.com" />
              <Text> - ExternalLink </Text>
            </Text>
          </AlignedText>
          <AlignedText>
            <Rectangle />
            <Text> - Rectangle </Text>
          </AlignedText>

          <AlignedText>
            <BackgroundPlaceholder />
            <Text> - BackgroundPlaceholder </Text>
          </AlignedText>

          <AlignedText>
            <StepDots numberOfSteps={SIGNUP_NUMBER_OF_STEPS} currentStep={currentStep} />
            <Text> - Steps </Text>
          </AlignedText>
          <AlignedText>
            <Button
              title="Back"
              onPress={() => setCurrentStep((step) => (step === 1 ? step : step - 1))}
            />
            <Spacer.Column numberOfSpaces={2} />
            <Button
              title="Next"
              onPress={() =>
                setCurrentStep((step) => (step === SIGNUP_NUMBER_OF_STEPS ? step : step + 1))
              }
            />
          </AlignedText>
          <AlignedText>
            <OfferImage categoryId={CategoryIdEnum.BEAUX_ARTS} imageUrl={imageUrl} />
            <Text> - OfferImage small </Text>
          </AlignedText>
          <AlignedText>
            <OfferImage categoryId={CategoryIdEnum.BEAUX_ARTS} imageUrl={imageUrl} size="tall" />
            <Text> - OfferImage tall </Text>
          </AlignedText>
          <AlignedText>
            <Badge value={1} />
            <Text> - Badge </Text>
          </AlignedText>
          <AlignedText>
            <ThreeShapesTicket>
              <QRCode value="passculture" />
            </ThreeShapesTicket>
          </AlignedText>

          <VenueTile
            moduleId={'module-id'}
            moduleName={'le nom du module'}
            height={LENGTH_S}
            width={LENGTH_S * (3 / 2)}
            userPosition={null}
            venue={{ ...mockVenues.hits[0], bannerUrl: undefined }}
          />
          <VenueTile
            moduleId={'module-id'}
            moduleName={'le nom du module géolocalisé'}
            height={LENGTH_S}
            width={LENGTH_S * (3 / 2)}
            userPosition={{
              latitude: 50,
              longitude: 51,
            }}
            venue={{ ...mockVenues.hits[0], bannerUrl: undefined }}
          />
        </AccordionItem>
        <Spacer.Column numberOfSpaces={5} />
        <Spacer.BottomScreen />
      </StyledScrollView>
    </React.Fragment>
  )
}

const StyledTitle4 = styled(Typo.Title4)(({ theme }) => ({
  color: theme.colors.tertiary,
}))

const AlignedText = styled(View)({
  flexDirection: 'row',
  alignItems: 'center',
})
const Center = styled(View)({
  alignItems: 'center',
})
const GreyView = styled.View(({ theme }) => ({
  backgroundColor: theme.colors.greyLight,
}))

const RowWrap = styled.View({
  flexWrap: 'wrap',
  flexDirection: 'row',
})

const StyledScrollView = styled(ScrollView)(({ theme }) => ({
  backgroundColor: theme.colors.white,
}))

const PrimaryProgressBar = styled(AnimatedProgressBar).attrs(({ theme }) => ({
  color: theme.colors.primary,
  icon: Email,
  progress: 0.5,
}))``
const PrimaryDarkProgressBar = styled(AnimatedProgressBar).attrs(({ theme }) => ({
  color: theme.colors.primaryDark,
  icon: Email,
  progress: 0.3,
}))``
const SecondaryProgressBar = styled(AnimatedProgressBar).attrs(({ theme }) => ({
  color: theme.colors.secondary,
  icon: Email,
  progress: 1,
}))``
const TertiaryProgressBar = styled(AnimatedProgressBar).attrs(({ theme }) => ({
  color: theme.colors.tertiary,
  icon: Email,
  progress: 1,
}))``
const ValidProgressBar = styled(AnimatedProgressBar).attrs(({ theme }) => ({
  color: theme.colors.greenValid,
  icon: Email,
  progress: 0,
}))``

const StyledImagePlaceholder = styled(ImagePlaceholder).attrs(({ theme }) => ({
  size: theme.icons.sizes.standard,
  borderRadius: 4,
  Icon: MAP_CATEGORY_ID_TO_ICON.FILM,
}))``

const StyledInputRule = styled(InputRule).attrs(({ theme }) => ({
  iconSize: theme.icons.sizes.extraSmall,
}))``

function doNothingFn() {
  /* do nothing */
}

const Divider = styled.View(({ theme }) => ({
  height: getSpacing(2),
  backgroundColor: theme.colors.greyLight,
}))

const FilterSwitchesSection = () => {
  const [switch1, setSwitch1] = useState(true)
  const [switch2, setSwitch2] = useState(false)

  return (
    <React.Fragment>
      <SectionRow
        type="clickable"
        title="Active and enabled"
        cta={
          <FilterSwitch active={switch1} disabled={false} toggle={() => setSwitch1((p) => !p)} />
        }
      />
      <Spacer.Column numberOfSpaces={1} />
      <SectionRow
        type="clickable"
        title="Active and disabled"
        cta={<FilterSwitch active={true} disabled={true} toggle={() => null} />}
      />
      <Spacer.Column numberOfSpaces={1} />
      <SectionRow
        type="clickable"
        title="Inactive and enabled"
        cta={
          <FilterSwitch active={switch2} disabled={false} toggle={() => setSwitch2((p) => !p)} />
        }
      />
      <Spacer.Column numberOfSpaces={1} />
      <SectionRow
        type="clickable"
        title="Inactive and disabled"
        cta={<FilterSwitch active={false} disabled={true} toggle={() => null} />}
      />
    </React.Fragment>
  )
}

const Label: React.FC<{ label: string }> = ({ label }) => {
  const [selected, setSelected] = useState<boolean>(false)
  return <SelectionLabel label={label} selected={selected} onPress={() => setSelected((p) => !p)} />
}
const ExampleSwitch: React.FC = () => {
  const [active, setActive] = useState<boolean>(false)
  return <FilterSwitch active={active} toggle={() => setActive((prevActive) => !prevActive)} />
}

const SnackBars = () => {
  const { showInfoSnackBar, showSuccessSnackBar, showErrorSnackBar, hideSnackBar } =
    useSnackBarContext()

  const snackbars = [
    {
      title: '✅ Success SnackBar',
      showSnackBar: showSuccessSnackBar,
      message: 'This was a success !!! '.repeat(5),
      timeout: 5000,
    },
    {
      title: '❌ Error SnackBar',
      showSnackBar: showErrorSnackBar,
      message: 'There was an error !',
      timeout: 5000,
      onClose: hideSnackBar,
    },
    {
      title: 'ℹ️ Info SnackBar',
      showSnackBar: showInfoSnackBar,
      message: 'Hello, for your information...',
      timeout: 10000,
    },
  ]

  return (
    <React.Fragment>
      {snackbars.map(({ title, showSnackBar, ...settings }) => (
        <React.Fragment key={title}>
          <TouchableOpacity onPress={() => showSnackBar(settings)}>
            <Typo.Title4>{title}</Typo.Title4>
          </TouchableOpacity>
          <Spacer.Column numberOfSpaces={1} />
        </React.Fragment>
      ))}
    </React.Fragment>
  )
}
