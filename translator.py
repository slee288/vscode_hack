from translate import Translator

class translator():
    text_to_translate=""
    target_language=""

    def translateText(self, text_to_translate, target_language):
        self.text_to_translate = text_to_translate
        self.strTolang = target_language
        translator = Translator(to_lang=self.strTolang)
        translate = translator.translate(self.text_to_translate)
        return (str(translate))

texts = list()
text = 'make function with name triangleArea with inputs with name width and with name height'
text2 = 'variable i is smaller than variable j'
texts.append(text)
texts.append(text2)
language = 'es'

my_translator= translator()
for text in texts:
    result= my_translator.translateText(text, language)
    print(result)
