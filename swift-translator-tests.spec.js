const { test, expect, selectors} = require( '@playwright/test' );

//Configiration
const CONFIG = {
  url: 'https://www.swifttranslator.com/',
  timeouts: {
    pageLoad: 2000,
    afterClear: 1000,
    translation: 3000,
    betweenTests: 2000
  },
  selectors: {
    inputField: 'Input Your Singlish Text Here.',
    outputContainer: 'div.w-full.h-80.p-3.rounded-lg.ring-1.ring-slate-300.whitespace-pre-wrap'
  }
};

const TEST_DATA = {
    positive: [
        {
            tcId: 'Pos_Fun_0001',
            name: 'Simple question',
            input: 'mokadha venne ithim?',
            expected: 'මොකද වෙන්නෙ ඉතිම්?',
            category: 'Daily language usage',
            grammar: 'Interrogative (question)',
            length: 'S'
        },
        {
            tcId: 'Pos_Fun_0002',
            name: 'Polite question request',
            input: 'karuNaakara mata udhavvak karanna puluvandha?',
            expected: 'කරුණාකර මට උදව්වක් කරන්න පුලුවන්ද?',
            category: 'Greeting / request / response',
            grammar: 'Interrogative (question)',
            length: 'S'
        },
        {
            tcId: 'Pos_Fun_0003',
            name: 'Simple present tense sentence',
            input: 'mama dhaen pothak kiyavanavaa',
            expected: 'මම දැන් පොතක් කියවනවා',
            category: 'Daily language usage',
            grammar: 'Simple sentence',
            length: 'S'
        },
        {
            tcId: 'Pos_Fun_0004',
            name: 'Negative sentence',
            input: 'mata eeka karanna baee',
            expected: 'මට ඒක කරන්න බෑ',
            category: 'Daily language usage',
            grammar: 'Negation (negative form)',
            length: 'S'
        },
        {
            tcId: 'Pos_Fun_0005',
            name: 'Future tense plan',
            input: 'api heta pansal yamu',
            expected: 'අපි හෙට පන්සල් යමු',
            category: 'Daily language usage',
            grammar: 'Future tense',
            length: 'S'
        },
        {
            tcId: 'Pos_Fun_0006',
            name: 'Compound sentence',
            input: 'mama panthi yanavaa, haebaeyi enna tikak parakku veyi.',
            expected: 'මම පන්ති යනවා, හැබැයි එන්න ටිකක් පරක්කු වෙයි.',
            category: 'Daily language usage',
            grammar: 'Compound sentence',
            length: 'M'
        },
        {
            tcId: 'Pos_Fun_0007',
            name: 'Mixed language with time and technical term',
            input: 'adha mata Zoom meeting ekak thiyenavaa 7.30 AM. kavuruth mata disturb karanna epaa.',
            expected: 'අද මට Zoom meeting එකක් තියෙනවා 7.30 AM. කවුරුත් මට disturb කරන්න එපා.',
            category: 'Mixed language usage',
            grammar: 'Imperative (command)',
            length: 'M'
        },
        {
            tcId: 'Pos_Fun_0008',
            name: 'Time based waiting statement',
            input: 'api adha 8.00 venakan innavaa.',
            expected: 'අපි අද 8.00 වෙනකන් ඉන්නවා.',
            category: 'Punctuation or numbers',
            grammar: 'Plural form',
            length: 'S'
        },
        {
            tcId: 'Pos_Fun_0009',
            name: 'Slang with emotional emphasis',
            input: 'appatasiri, mata potha geenna amathaka vuNaa kiyahankoo.',
            expected: 'අප්පටසිරි, මට පොත ගේන්න අමතක වුණා කියහන්කෝ.',
            category: 'Slang / informal language',
            grammar: 'Simple sentence',
            length: 'M'
        },
        {
            tcId: 'Pos_Fun_0010',
            name: 'OTP request',
            input: 'OTP eka evanna.',
            expected: 'OTP එක එවන්න.',
            category: 'Slang / informal language',
            grammar: 'Imperative (command)',
            length: 'S'
        }, 
        {
            tcId: 'Pos_Fun_0011',
            name: 'Multi-line quoted input',
            input: 'mama movie ekak balanna yanavaa.' + '\n' +
                   'oyaath enavadha?',
            expected: 'මම movie එකක් බලන්න යනවා.\nඔයාත් එනවද?',
            category: 'Formatting (multi-line)',
            grammar: 'Interrogative (question)',
            length: 'M'
        },
        {
            tcId: 'Pos_Fun_0012',
            name: 'Place name usage',
            input: 'api Kandy yamu.',
            expected: 'අපි Kandy යමු.',
            category: 'Place name usage',
            grammar: 'Simple sentence',
            length: 'S'
        },
        {
            tcId: 'Pos_Fun_0013',
            name: 'Weight and unit handling',
            input: 'magee bara 5kg kin vaedivelaa. ',  
            expected: 'මගේ බර 5kg කින් වැඩිවෙලා.',
            category: 'Punctuation / numbers',
            grammar: 'Simple sentence',
            length: 'S'
        },
        {
            tcId: 'Pos_Fun_0014',
            name: 'Date format preservation',
            input: '2026/05/21 mama gedhara enavaa.',
            expected: '2026/05/21 මම ගෙදර එනවා.',
            category: 'Punctuation / numbers',
            grammar: 'Simple sentence',
            length: 'S'
        },
        {
            tcId: 'Pos_Fun_0015',
            name: 'Long descriptive paragraph',
            input: 'penguyin yanu saeema vitama saadhayakata saerasii sitina aakaarayata penena haasYAjanaka, aakarshaniiya pakShiin ya. ovun godabima aevidhithi, ayis matha lissaa lissaa yathi, saha vRUththikayan men saagarayata kimidhethi. ovunta piyaasara kaLa nohaeki vuvadha, penguyin vishiShta pihinumkaruvan ya; ovun thama varal Bhaavithaa karannee dhiya yata piyaapath men ya. hima vaetena aentaaktikaavee sita uNusum veraLa thiirayan dhakvaa, mema pakShiin katuka kaalaguNayen beerii, maaLu dhadayam kara, ovungee pavulvalata samiipava sitithi. hurubuhuti, dhaedi saha pauruShayen pirii aetha!',
            expected: 'පෙන්ගුයින් යනු සෑම විටම සාදයකට සැරසී සිටින ආකාරයට පෙනෙන හාස්‍යජනක, ආකර්ශනීය පක්ෂීන් ය. ඔවුන් ගොඩබිම ඇවිදිති, අයිස් මත ලිස්සා ලිස්සා යති, සහ වෘත්තිකයන් මෙන් සාගරයට කිමිදෙති. ඔවුන්ට පියාසර කළ නොහැකි වුවද, පෙන්ගුයින් විශිෂ්ට පිහිනුම්කරුවන් ය; ඔවුන් තම වරල් භාවිතා කරන්නේ දිය යට පියාපත් මෙන් ය. හිම වැටෙන ඇන්ටාක්ටිකාවේ සිට උණුසුම් වෙරළ තීරයන් දක්වා, මෙම පක්ෂීන් කටුක කාලගුණයෙන් බේරී, මාළු දඩයම් කර, ඔවුන්ගේ පවුල්වලට සමීපව සිටිති. හුරුබුහුටි, දැඩි සහ පෞරුෂයෙන් පිරී ඇත!',
            category: 'Formating (Paragraph)',
            grammar: 'Complex sentence',
            length: 'L' 
        },

        {
            tcId: 'Pos_Fun_0016',
            name: 'Repeated word emphasis',
            input: 'ekadhigata code karadhdhi tika tika coding puluvan venavaa.',  
            expected: 'එකදිගට code කරද්දි ටික ටික coding පුලුවන් වෙනවා.',
            category: 'Slang / informal language',
            grammar: 'Complex sentence',
            length: 'M'
        },
        {
            tcId: 'Pos_Fun_0017',
            name: 'WhatsApp media request',
            input: 'mata ee photos tika Whatsapp eken dhaannakoo.',  
            expected: 'මට ඒ photos ටික Whatsapp එකෙන් දාන්නකෝ.',
            category: ' Common English words',
            grammar: 'Simple sentence',
            length: 'M'
        }, 
        {
            tcId: 'Pos_Fun_0018',
            name: 'QR code instruction',
            input: 'meeke QR code eka scan karalaa balanna.',  
            expected: 'මේකෙ QR code එක scan කරලා බලන්න.',
            category: 'Word combination / phrase pattern',
            grammar: 'Imperative (command)',
            length: 'M'
        },
        {
            tcId: 'Pos_Fun_0019',
            name: 'Informal waiting message',
            input: 'poddak inna mQQ ikmanata ennam.',
            expected: 'පොඩ්ඩක් ඉන්න මං ඉක්මනට එන්නම්.',
            category: 'Slang / informal language',
            grammar: 'Future tense',
            length: 'S'
        },
        {
            tcId: 'Pos_Fun_0020',
            name: 'Simple positive response',
            input: 'hari, mQQ kannam.',
            expected: 'හරි, මං කන්නම්.',
            category: 'Response',
            grammar: 'Simple sentence',
            length: 'S'
        },
        {
            tcId: 'Pos_Fun_0021',
            name: 'Weather-based negation',
            input: 'heta vaessoth mama school enne naee.',
            expected: 'හෙට වැස්සොත් මම school එන්නෙ නෑ.',
            category: 'Daily language usage',
            grammar: 'Negation (negative form)',
            length: 'S'
        },
        {
            tcId: 'Pos_Fun_0022',
            name: 'Informal praise',
            input: 'ela machan! eeka maru.',
            expected: 'එල මචන්! ඒක මරු.',
            category: 'Slang / informal language',
            grammar: 'Simple sentence',
            length: 'S'
        },
        {
            tcId: 'Pos_Fun_0023',
            name: 'Morning plan question',
            input: 'oyaa heta udheema enavadha?',
            expected: 'ඔයා හෙට උදේම එනවද?',
            category: 'Daily language usage',
            grammar: 'Interrogative (question)',
            length: 'S'
        },
        {
            tcId: 'Pos_Fun_0024',
            name: 'Past tense work activity',
            input: 'mama iiye office giyaa.',
            expected: 'මම ඊයෙ office ගියා.',
            category: 'Daily language usage',
            grammar: 'Past tense',
            length: 'S'
        },

    ],

    negative: [
      {
        tcId: 'Neg_Fun_001',
        name: 'Elongated emotional word handling',
        input: 'Ammeeee oyaa kohedha?',
        expected: 'අම්මේ ඔයා කොහෙද?',
        category: 'Typographical error handling',
        grammar: 'Interrogative (question)',
        length: 'S'
      },
      {
        tcId: 'Neg_Fun_002',
        name: 'Joined words without spacing',
        input: 'adhamamakaeemagenaavenaee.',
        expected: 'අද මම කෑම ගෙනාවෙ නෑ.',
        category: 'Typographical error handling',
        grammar: 'Negation (negative form)',
        length: 'S'
      },
      {
        tcId: 'Neg_Fun_003',
        name: 'Proper noun spelling accuracy',
        input: 'nangi lokuammaa ekka shopping giyaa.',
        expected: 'නංගි ලොකුඅම්මා එක්ක shopping ගියා.',
        category: 'Daily language usage',
        grammar: 'Past tense',
        length: 'M'
      },
      {
        tcId: 'Neg_Fun_004',
        name: 'Extra space preservation',
        input: 'mama    adha enakota          tikak       parakku veyi.',
        expected: 'මම අද එනකොට ටිකක් පරක්කු වෙයි.',
        category: 'Formatting (spaces / line breaks / paragraph)',
        grammar: 'Future tense',
        length: 'M'
      },
      {
        tcId: 'Neg_Fun_005',
        name: 'ID and alphanumeric code mistranslation',
        input: 'magee student Id eka naethivelaa. Id number eka IT12345678.',
        expected: 'මගේ student Id එක නැතිවෙලා. Id number එක IT12345678.',
        category: 'common English words',
        grammar: 'Pronoun variation',
        length: 'M'
      },
      {
        tcId: 'Neg_Fun_006',
        name: 'Mixed language technical terms',
        input: 'mama iye hoDHAtama leda welaa hitiyee.',
        expected: 'මම ඊයෙ හොඳටම ලෙඩ වෙලා හිටියේ.',
        category: 'Daily language usage',
        grammar: 'Past tense',
        length: 'S'
      },
      {
        tcId: 'Neg_Fun_007',
        name: 'Special character inside English word',
        input: 'oyaa adha le$tures giyoth mata note eka evanavadha?',
        expected: 'ඔයා අද lectures ගියොත් මට note එක එවනවද?',
        category: 'Typographical error handling',
        grammar: 'Interrogative (question)',
        length: 'M'
      },
      {
        tcId: 'Neg_Fun_008',
        name: 'URL formatting corruption',
        input: 'mee website ekata gihin balanna. https://www.swifttranslator.com/.',
        expected: 'මේ website එකට ගිහින් බලන්න. https://www.swifttranslator.com/.',
        category: 'Word combination / phrase pattern',
        grammar: ' Imperative (command)',
        length: 'M'
      },
      {
        tcId: 'Neg_Fun_009',
        name: 'Organization name mistranslation',
        input: 'adha Sliit eke function ekak thiyenavaa.',
        expected: 'අද Sliit එකේ function එකක් තියෙනවා.',
        category: 'Names / places / common English words',
        grammar: 'Simple sentence',
        length: 'M'
      },
      {
        tcId: 'Neg_Fun_010',
        name: 'Company name character distortion',
        input: 'eyaa wso2 eke interview ekakata giyaa.',
        expected: 'එයා wso2 එකේ interview එකකට ගියා.',
        category: 'Names / places / common English words',
        grammar: 'Past tense',
        length: 'M',
      },
    ],

    ui: {
      tcId: 'UI_001',
      name: 'UI Functionality Test - Partial Input Handling',
      input: 'oba kohomada innawada?',
      partialInput: 'oba kohomada ',
      expectedFull: 'ඔබ කොහොමද ඉන්නවද?'
    }
};

// Helper Functions
class TranslatorPage {
  constructor(page) {
    this.page = page;
  }

  async navigateToSite() {
    await this.page.goto(CONFIG.url);
    await this.page.waitForLoadState('networkidle');
    await this.page.waitForTimeout(CONFIG.timeouts.pageLoad);
  }

  async getInputField() {
    return this.page.getByRole('textbox', { name: CONFIG.selectors.inputField });
  }

  async getOutputField() {
    return this.page
      .locator(CONFIG.selectors.outputContainer)
      .filter({ hasNot: this.page.locator('textarea') })
      .first();
  }

  async clearAndWait() {
    const input = await this.getInputField();
    await input.clear();
    await this.page.waitForTimeout(CONFIG.timeouts.afterClear);
  }

  async typeInput(text) {
    const input = await this.getInputField();
    await input.fill(text);
  }

  async waitForOutput() {
    await this.page.waitForFunction(
      () => {
        const elements = Array.from(
          document.querySelectorAll('.w-full.h-80.p-3.rounded-lg.ring-1.ring-slate-300.whitespace-pre-wrap')
        );
        const output = elements.find(el => {
          const isInputField = el.tagName === 'TEXTAREA' || el.getAttribute('role') === 'textbox';
          return !isInputField && el.textContent && el.textContent.trim().length > 0;
        });
        return output !== undefined;
      },
      { timeout: 10000 }
    );
    await this.page.waitForTimeout(CONFIG.timeouts.translation);
  }

  async getOutputText() {
    const output = await this.getOutputField();
    const text = await output.textContent();
    return text.trim();
  }

  async performTranslation(inputText) {
    await this.clearAndWait();
    await this.typeInput(inputText);
    await this.waitForOutput();
    return await this.getOutputText();
  }
}

// Test Suite
test.describe('SwiftTranslator - Singlish to Sinhala Conversion Tests', () => {
  let translator;

  test.beforeEach(async ({ page }) => {
    translator = new TranslatorPage(page);
    await translator.navigateToSite();
  });

  // Positive Functional Tests
  test.describe('Positive Functional Tests', () => {
    for (const testCase of TEST_DATA.positive) {
      test(`${testCase.tcId} - ${testCase.name}`, async () => {
        const actualOutput = await translator.performTranslation(testCase.input);
        expect(actualOutput).toBe(testCase.expected);
        await translator.page.waitForTimeout(CONFIG.timeouts.betweenTests);
      });
    }
  });

  // Negative Functional Tests
  test.describe('Negative Functional Tests', () => {
    for (const testCase of TEST_DATA.negative) {
      test(`${testCase.tcId} - ${testCase.name}`, async () => {
        const actualOutput = await translator.performTranslation(testCase.input);
        expect(actualOutput).toBe(testCase.expected);
        await translator.page.waitForTimeout(CONFIG.timeouts.betweenTests);
      });
    }
  });

  // UI Test
  test.describe('UI Functionality Tests', () => {
    test(`${TEST_DATA.ui.tcId} - ${TEST_DATA.ui.name}`, async ({ page }) => {
      const translator = new TranslatorPage(page);
      const input = await translator.getInputField();
      const output = await translator.getOutputField();

      await translator.clearAndWait();
      
      // Type partial input
      await input.pressSequentially(TEST_DATA.ui.partialInput, { delay: 150 });
      
      // Wait for partial output
      await page.waitForTimeout(1500);
      
      // Verify partial translation appears
      let outputText = await output.textContent();
      expect(outputText.trim().length).toBeGreaterThan(0);
      
      // Complete typing
      await input.pressSequentially(TEST_DATA.ui.input.substring(TEST_DATA.ui.partialInput.length), { delay: 150 });
      
      // Wait for full translation
      await translator.waitForOutput();
      
      // Verify full translation
      outputText = await translator.getOutputText();
      expect(outputText).toBe(TEST_DATA.ui.expectedFull);
      
      await page.waitForTimeout(CONFIG.timeouts.betweenTests);
    });
  });
});
