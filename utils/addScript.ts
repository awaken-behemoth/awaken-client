interface ScriptAttr {
  src: string;
  defer?: boolean;
  async?: boolean;
}

/**
 * Add a script with the given url to the dom;
 *
 * @param url script url;
 * @returns reference to created script element
 */

const addScript = (config: ScriptAttr) => {
  const script = document.createElement('script');
  script.type = 'text/javascript';

  Object.keys(config).forEach(
    (attr: keyof ScriptAttr) => (script[attr] = config[attr] as never)
  );

  document.head.appendChild(script);

  return script;
};

export default addScript;
