import flatMap from 'lodash/flatMap';

export const criteriaData = {
  
}




export type OrgData = {
  orgs: Org[];
  categories: Category[];
}

export type Org = {
  name: string;
  aka?: string;
  link: string;
  summary?: string;
}

export type OrgWithScore = Org & {
  overallScore: number;
}

export type Category = {
  name: string;
  criteria?: CriteriaItem[];
  link: string;
  weight: number;
  description: string;
  hovertext: string;
  subcategories?: SubCategory[];
  orgs: CategoryOrg[];
  hovertextFromSection?: string;
}

export type CategoryOrg = {
  name: string;
  url: string;
  hovertextFromSection?: string;
}


export type SubCategory = {
  name: string;
  criteria: CriteriaItem[];
  weight: number;
}

export type CriteriaItem = {
  name: string;
  weight: number;
  hovertext?: string;
  orgs: CriteriaItemOrg[];
}

export type CriteriaItemOrg = {
  name: string;
  rating?: number;
  hovertextFromSection?: string;
}

export type CriteriaItemDetails = CriteriaItem & {
  category?: Category;
  subcategory?: SubCategory;
  description?: string;
  hovertext?: string;
  orgs: CriteriaItemOrg[];
}

export const getDetailedCriteriaItem = (criteriaItem: CriteriaItem, orgs: CriteriaItemOrg[], category?: Category, subcategory?: SubCategory): CriteriaItemDetails => {
  return {
    ...criteriaItem,
    category,
    subcategory,
    orgs,
  };
}

export const getCriteriaList = (orgData: OrgData): CriteriaItemDetails[] => {
  const criteriaList: CriteriaItem[] = [];
  orgData.categories.forEach((category) => {
    category.criteria?.forEach((criteriaItem) => {
      criteriaList.push(getDetailedCriteriaItem(criteriaItem, criteriaItem.orgs, category));
    });
    category.subcategories?.forEach((subcategory) => {
      subcategory.criteria?.forEach((criteriaItem) => {
        criteriaList.push(getDetailedCriteriaItem(criteriaItem, criteriaItem.orgs, category, subcategory));
      });
    });
  });
  return criteriaList;
}

export const getCategoryList = (orgData: OrgData) => {
  return orgData.categories.map
}

export const getSubcategoryList = (orgData: OrgData) => {
  return orgData.categories.flatMap((category) => category.subcategories?.map(subcategory => ({
    ...subcategory,
    category,
  })));
}

export const getCriteriaHierarchy = (orgData: OrgData): Category[] => {
  const { categories } = orgData;

  return categories.map((category) => {
    // Gather criteria from the category
    const categoryCriteria = (category.criteria || []).map((criteriaItem) => ({
      ...criteriaItem,
      categoryName: category.name,
      subcategoryName: null,
    }));

    // Gather criteria from subcategories
    const subcategoryCriteria = flatMap(category.subcategories || [], (subcategory: SubCategory) =>
      (subcategory.criteria || []).map((criteriaItem: CriteriaItem) => ({
        ...criteriaItem,
        categoryName: category.name,
        subcategoryName: subcategory.name,
      }))
    );

    // Combine all criteria
    const allCriteria = [...categoryCriteria, ...subcategoryCriteria];

    return {
      ...category,
      criteria: allCriteria,
    };
  });
};


export const orgData: OrgData = {
  "orgs": [
    {
      "name": "Microsoft",
      "link": "microsoft",
      "summary": `<p>Microsoft does AI research and trains AI models. Its most powerful models are the <a href="https://azure.microsoft.com/en-us/blog/introducing-phi-3-redefining-whats-possible-with-slms/">Phi-3</a> family. It has not yet created frontier models, but it does provide access to others’ frontier models on its platform Azure. In addition to deploying models via Azure, Microsoft deploys GPT-4 via Copilot (formerly known as Bing Chat).</p><p>Microsoft has a strong partnership with OpenAI. The details are secret, but it seems that OpenAI is required to share its models (and some other IP) with Microsoft until OpenAI <a href="https://openai.com/our-structure#:~:text=the%20board%20determines%20when%20we%27ve%20attained%20AGI.%20Again%2C%20by%20AGI%20we%20mean%20a%20highly%20autonomous%20system%20that%20outperforms%20humans%20at%20most%20economically%20valuable%20work.%20Such%20a%20system%20is%20excluded%20from%20IP%20licenses%20and%20other%20commercial%20terms%20with%20Microsoft%2C%20which%20only%20apply%20to%20pre%2DAGI%20technology.">attains</a> “a highly autonomous system that outperforms humans at most economically valuable work.” Microsoft also partners with <a href="https://about.fb.com/news/2023/07/llama-2/">Meta AI</a>, <a href="https://techcrunch.com/2024/02/27/microsoft-made-a-16-million-investment-in-mistral-ai/">Mistral AI</a>, and <a href="https://inflection.ai/the-new-inflection">Inflection AI</a> to deploy their models via Azure.</p><p>Microsoft sometimes writes about its safety practices and commitments. It <a href="https://blogs.microsoft.com/on-the-issues/2023/10/26/microsofts-ai-safety-policies/">responded</a> to <a href="https://www.aisafetysummit.gov.uk/policy-updates/#company-policies">the UK request for information about AI companies’ safety policies</a>[1] and <a href="https://blogs.microsoft.com/on-the-issues/2023/07/21/commitment-safe-secure-ai/">substantively commented</a> on <a href="https://www.whitehouse.gov/briefing-room/statements-releases/2023/07/21/fact-sheet-biden-harris-administration-secures-voluntary-commitments-from-leading-artificial-intelligence-companies-to-manage-the-risks-posed-by-ai/">the White House commitments</a>. Microsoft also writes about <a href="https://www.microsoft.com/en-us/ai/responsible-ai">Responsible AI</a>, but these practices seem irrelevant to extreme risks.</p><p>Microsoft does not do alignment research or have an alignment plan.</p><p>Some of Microsoft’s leadership is concerned about extreme risks from AI. In particular, CTO Kevin Scott and Chief Scientific Officer Eric Horvitz signed <a href="https://www.safe.ai/work/statement-on-ai-risk">the CAIS statement</a>. But CEO Satya Nadella seems less concerned, and Microsoft itself never articulates concerns about extreme risks.</p>`
    },
    {
      "name": "Deepmind",
      "aka": "DeepMind",
      "link": "deepmind",
      "summary": `<p>DeepMind was founded in 2010 and acquired by Google in 2014. It is led by Demis Hassabis.</p><p>DeepMind’s flagship models are <a href="https://blog.google/technology/ai/google-gemini-next-generation-model-february-2024/">Gemini 1.5 Pro</a> and <a href="https://blog.google/technology/ai/google-gemini-ai/#performance">Gemini Ultra</a>. It released these models via API and published the <a href="https://storage.googleapis.com/deepmind-media/gemini/gemini_v1_5_report.pdf">capabilities</a> <a href="https://storage.googleapis.com/deepmind-media/gemini/gemini_1_report.pdf">research</a> behind these models. They also recently released the weights of their smaller <a href="https://blog.google/technology/developers/gemma-open-models/">Gemma</a> <a href="https://developers.googleblog.com/2024/04/gemma-family-expands.html">models</a>.</p><p>DeepMind has a safety team and Hassabis seems aware of extreme risks. But DeepMind as an organization doesn’t have an alignment plan or say much about extreme risks, Google doesn’t have a safety team, and Google’s leadership doesn’t seem aware of extreme risks.</p><p>DeepMind and Google <a href="https://deepmind.google/public-policy/ai-summit-policies/#responsible-capabilities-scaling">have</a> various boards intended to promote responsibility, but the details are unclear and none of them seem to be focused on uncontrollable AI or averting extreme risks.</p><p>This project focuses on LLMs, but DeepMind is also well-known for <a href="https://deepmind.google/technologies/alphago/">AlphaGo</a>, <a href="https://deepmind.google/technologies/alphafold/">AlphaFold</a>, and its work on RL agents.</p>`
    },
    {
      "name": "Meta AI",
      "aka": "Meta",
      "link": "meta",
      "summary": `<p>Meta AI was established in 2013 under Yann LeCun. Its flagship family of models is <a href="https://ai.meta.com/blog/meta-llama-3/">Llama 3</a>.</p><p>Meta AI highly values openness and its research is more open than most frontier labs’. It publishes its research and releases its model weights. It also supports openness when doing policy advocacy, and it leads and joins <a href="https://about.fb.com/news/2023/07/llama-2-statement-of-support/">open</a> <a href="https://open.mozilla.org/letter/">letters</a> supporting openness in AI.</p><p>LeCun and many others at Meta AI explicitly disbelieve extreme risks from uncontrollable AI. Accordingly, Meta AI does little to reduce those risks, but it does some red-teaming, fine-tuning, and RLHF before releasing models, plus recently model evals for hacking capabilities and red-teaming for CBRNE capabilities.</p>`
    },
    {
      "name": "OpenAI",
      "link": "openai",
      summary: `<p>OpenAI was founded in 2015 as a nonprofit. It is led by Sam Altman. In 2019, it created a capped-profit company in order to fundraise; the company is controlled by the nonprofit board.</p><p>OpenAI’s flagship model is <a href="https://openai.com/index/gpt-4-research">GPT-4</a>.</p><p>OpenAI’s <a href="https://cdn.openai.com/openai-preparedness-framework-beta.pdf">Preparedness Framework</a> describes its risk assessment plans and related commitments.</p><p>OpenAI seems to be <a href="https://openai.com/our-structure">obligated</a> to share its models with Microsoft until it attains “AGI,” “a highly autonomous system that outperforms humans at most economically valuable work.” It has left details of its relationship with Microsoft opaque, including its model-sharing obligations.</p><p>OpenAI is aware that powerful AI entails extreme risks.[1]</p>`
    },
    {
      "name": "Anthropic",
      "link": "anthropic",
      "summary": `<p>In 2021, some of the OpenAI safety team quit to found Anthropic to promote AI safety. Anthropic is led by Dario Amodei. It is a Delaware public-benefit corporation. Its <a href="https://corpgov.law.harvard.edu/2023/10/28/anthropic-long-term-benefit-trust/">mission</a> is to “responsibly develop and maintain advanced AI for the long-term benefit of humanity.” Its flagship family of models is <a href="https://www.anthropic.com/news/claude-3-family">Claude 3</a>. It deploys them via its chatbot <a href="https://claude.ai/">Claude</a>, its <a href="https://www.anthropic.com/api">API</a>, and the <a href="https://www.aboutamazon.com/news/aws/amazon-bedrock-anthropic-ai-claude-3">Amazon Bedrock API</a>.</p><p>Anthropic has lots of safety researchers and does lots of good safety work. Its leadership and staff tend to say they are very concerned about extreme risks from AI.</p><p>Anthropic’s <a href="https://www.anthropic.com/news/anthropics-responsible-scaling-policy">Responsible Scaling Policy</a> describes its risk assessment practices and contains commitments about risk assessment and how safety and security practices and model development and deployment decisions depend on risk assessment results.</p><p>Anthropic’s <a href="https://www.anthropic.com/news/the-long-term-benefit-trust">Long-Term Benefit Trust</a>—an independent group with a mandate for safety and benefit-sharing—has the power to elect a majority of its board (as of Nov 2024). <a href="https://ailabwatch.org/blog/anthropic-trust-powerless/">But Anthropic’s shareholders can abrogate the Trust and the details are unclear.</a></p>`
    },
    {
      "name": "xAI",
      "link": "xai"
    },
    {
      "name": "Amazon",
      "link": "amazon"
    },
    {
      "name": "DeepSeek",
      "link": "deepseek"
    }
  ],
  "categories": [
    {
      "name": "Risk assessment",
      "link": "risk-assessment",
      "weight": 20,
      "description": "Predict models' dangerous capabilities and check for warning signs for those capabilities",
      "hovertext": "Predict models' dangerous capabilities and check for warning signs for those capabilities",
      "orgs": [
        {
          "name": "Microsoft",
          "url": "/microsoft#risk-assessment"
        },
        {
          "name": "DeepMind",
          "url": "/deepmind#risk-assessment"
        },
        {
          "name": "Meta",
          "url": "/meta#risk-assessment"
        },
        {
          "name": "OpenAI",
          "url": "/openai#risk-assessment"
        },
        {
          "name": "Anthropic",
          "url": "/anthropic#risk-assessment"
        }
      ],
      "subcategories": [
        {
          "name": "Measuring threats",
          "weight": 60,
          "criteria": [
            {
              "name": "Model evals",
              "weight": 10,
              "hovertext": "Do model evals for dangerous capabilities before deployment. In particular, watch for autonomous replication, coding (finding/exploiting vulnerabilities in code, writing malicious code, or writing code with hidden vulnerabilities), and situational awareness or long-horizon planning capabilities. Detail the specific tasks the lab uses in its evaluations (omitting dangerous details if relevant).",
              "orgs": [
                {
                  "name": "Microsoft",
                  "rating": 3,
                  "hovertextFromSection": "\"Microsoft's AI Safety Policies\" doesn't mention model evals for dangerous capabilities. But it says \"red team testing will include testing of dangerous capabilities, including related to biosecurity and cybersecurity.\""
                },
                {
                  "name": "DeepMind",
                  "rating": 93,
                  "hovertextFromSection": "OUT OF DATE They do model evals on persuasion and deception, cybersecurity, self-proliferation, and self-reasoning, and they are working on CBRN. They describe most tasks in detail. However, they performed these evals after deploying the Gemini 1.0 models, and they have not committed to use the evals before future deployments."
                },
                {
                  "name": "Meta",
                  "rating": 33,
                  "hovertextFromSection": "OUT OF DATE The Llama 3 model card includes information on model evals and red-teaming. Llama 3 was tested for CBRNE and cyber capabilities. However, Meta AI has not committed to do risk assessment before deployment. The cyber evals are mostly irrelevant to dangerous capabilities, but they do measure the model's vulnerability identification and exploitation capabilities. Meta AI open-sourced its CYBERSECEVAL 3 eval suite; it has not shared details on its CBRNE testing."
                },
                {
                  "name": "OpenAI",
                  "rating": 58,
                  "hovertextFromSection": "OUT OF DATE OpenAI commits to do model evals for model autonomy, cybersecurity, CBRN, and persuasion. But it has not yet created these evals or implemented its Preparedness Framework, it seems. Additionally, its risk threshold relevant to <i>internal</i> deployment is very high."
                },
                {
                  "name": "xAI",
                  "rating": 0,
                  "hovertextFromSection": ""
                },
                {
                  "name": "Amazon",
                  "rating": 0,
                  "hovertextFromSection": ""
                },
                {
                  "name": "DeepSeek",
                  "rating": 0,
                  "hovertextFromSection": ""
                },
                {
                  "name": "Anthropic",
                  "rating": 65,
                  "hovertextFromSection": "OUT OF DATE Anthropic does model evals for autonomous replication and adaption, cyber capabilities, and biology capabilities. The Claude 3 model card describes the biology and cyber evaluations at a high level but excludes the specific tasks. The RSP has details on autonomy tasks."
                }
              ]
            },
            {
              "name": "Evaluation and red-teaming details",
              "weight": 6,
              "hovertext": "Explain the details of how the lab evaluates performance on the tasks it uses in model evals and how it does red-teaming (excluding dangerous or acceleratory details). In particular, explain its choices about fine-tuning, scaffolding/plugins, prompting, how to iterate on prompts, and whether the red-team gets a fixed amount of person-hours and compute or how else they decide when to give up on eliciting a capability. And those details should be good. Evaluated holistically.",
              "orgs": [
                {
                  "name": "Microsoft",
                  "rating": 0,
                  "hovertextFromSection": "No."
                },
                {
                  "name": "DeepMind",
                  "rating": 50,
                  "hovertextFromSection": "OUT OF DATE See \"Evaluating Frontier Models for Dangerous Capabilities\" (DeepMind: Phuong et al. 2024)."
                },
                {
                  "name": "Meta",
                  "rating": 0,
                  "hovertextFromSection": "No."
                },
                {
                  "name": "OpenAI",
                  "rating": 50,
                  "hovertextFromSection": "OUT OF DATE No.  OpenAI doesn't share details, but its Preparedness Framework does say \"fine-tuning or other domain-specific enhancements (e.g., tailored prompts or language model programs) may better elicit model capabilities along a particular risk category. Our evaluations will thus include tests against these enhanced models to ensure we are testing against the 'worst case' scenario we know of\" and \"We want to ensure our understanding of pre-mitigation risk takes into account a model that is 'worst known case' (i.e., specifically tailored) for the given domain. To this end, for our evaluations, we will be running them not only on base models (with highly-performant, tailored prompts wherever appropriate), but also on fine-tuned versions designed for the particular misuse vector without any mitigations in place.\""
                },
                {
                  "name": "xAI",
                  "rating": 0,
                  "hovertextFromSection": ""
                },
                {
                  "name": "Amazon",
                  "rating": 0,
                  "hovertextFromSection": ""
                },
                {
                  "name": "DeepSeek",
                  "rating": 0,
                  "hovertextFromSection": ""
                },
                {
                  "name": "Anthropic",
                  "rating": 25,
                  "hovertextFromSection": "OUT OF DATE \"Evaluation details\" in \"ASL-3 Evaluations for Autonomous Capabilities\" in \"Anthropic's Responsible Scaling Policy\" has some details. The Claude 3 report has no details."
                }
              ]
            },
            {
              "name": "Control arguments",
              "weight": 4,
              "hovertext": "Prepare to have \"control arguments\" for the lab's powerful models, i.e. arguments that those systems cannot cause a catastrophe even if the systems are scheming. And publish this. For now, the lab should: <ul> <li>Prepare to do risk assessment to determine whether its systems would be dangerous, if those systems were scheming.</li> <li>Test its AI systems to ensure that they report coup attempts (or other misbehavior) by themselves or other (instances of) AI systems, and that they almost never initiate or cooperate with coup attempts.</li> </li> </ul>",
              "orgs": [
                {
                  "name": "Microsoft",
                  "rating": 0,
                  "hovertextFromSection": "No."
                },
                {
                  "name": "DeepMind",
                  "rating": 13,
                  "hovertextFromSection": "OUT OF DATE No."
                },
                {
                  "name": "Meta",
                  "rating": 0,
                  "hovertextFromSection": "No."
                },
                {
                  "name": "OpenAI",
                  "rating": 0,
                  "hovertextFromSection": "No."
                },
                {
                  "name": "xAI",
                  "rating": 0,
                  "hovertextFromSection": ""
                },
                {
                  "name": "Amazon",
                  "rating": 0,
                  "hovertextFromSection": ""
                },
                {
                  "name": "DeepSeek",
                  "rating": 0,
                  "hovertextFromSection": ""
                },
                {
                  "name": "Anthropic",
                  "rating": 0,
                  "hovertextFromSection": "No. But Anthropic senior staff member Zac Hatfield-Dodds told us \"I think we'd describe this as the positive safety case for ASL-4 models.\""
                }
              ]
            },
            {
              "name": "Third-party access",
              "weight": 6,
              "hovertext": "Give some third parties access to models to do model evals for dangerous capabilities. This access should include fine-tuning and tools/plugins. It should occur both during training and between training and deployment. It should include base models rather than just safety-tuned models, unless the lab can demonstrate that the safety-tuning is robust. The third parties should have independence and control over their evaluation; just using external red-teamers is insufficient. The third parties should have expertise in eliciting model capabilities (but the lab should also offer assistance in this) and in particular subjects if relevant. The lab should incorporate the results into its risk assessment.",
              "orgs": [
                {
                  "name": "Microsoft",
                  "rating": 0,
                  "hovertextFromSection": "No."
                },
                {
                  "name": "DeepMind",
                  "rating": 10,
                  "hovertextFromSection": "OUT OF DATE DeepMind shared Gemini Ultra with unspecified external groups to test for dangerous capabilities before deployment. But DeepMind didn't share deep access: it only shared a system with safety fine-tuning and safety filters and it didn't allow them to fine-tune the model. DeepMind has not shared any results of this testing."
                },
                {
                  "name": "Meta",
                  "rating": 0,
                  "hovertextFromSection": "Meta uses external red-teamers, but it doesn't use specialized third-party evaluators (and this only happens after training)."
                },
                {
                  "name": "OpenAI",
                  "rating": 25,
                  "hovertextFromSection": "OUT OF DATE OpenAI gave METR early access to GPT-4 to do autonomous replication evals. They haven't committed to share access for model evals more generally. They say \"Scorecard evaluations (and corresponding mitigations) will be audited by qualified, independent third-parties to ensure accurate reporting of results, either by reproducing findings or by reviewing methodology to ensure soundness, at a cadence specified by the SAG and/or upon the request of OpenAI Leadership or the BoD.\" Third-party evaluation should include more open-ended red-teaming or evals determined by the third party."
                },
                {
                  "name": "xAI",
                  "rating": 0,
                  "hovertextFromSection": ""
                },
                {
                  "name": "Amazon",
                  "rating": 0,
                  "hovertextFromSection": ""
                },
                {
                  "name": "DeepSeek",
                  "rating": 0,
                  "hovertextFromSection": ""
                },
                {
                  "name": "Anthropic",
                  "rating": 25,
                  "hovertextFromSection": "OUT OF DATE Anthropic worked with METR (then part of ARC) for a previous Claude model but hasn't said anything about this recently."
                }
              ]
            }
          ]
        },
        {
          "name": "Commitments",
          "weight": 15,
          "criteria": [
            {
              "name": "Risk assessment frequency",
              "weight": 1,
              "hovertext": "Do risk assessment (for dangerous capabilities) regularly during training, before deployment, and during deployment (and commit to doing so), so that the lab will detect warning signs before dangerous capabilities appear. During training, do risk assessment at least every 4x increase in training compute; during deployment, do it before pushing major changes and otherwise at least every 3 months (to account for improvements in fine-tuning, scaffolding, plugins, prompting, etc.).",
              "orgs": [
                {
                  "name": "Microsoft",
                  "rating": 0,
                  "hovertextFromSection": "No."
                },
                {
                  "name": "DeepMind",
                  "rating": 25,
                  "hovertextFromSection": "OUT OF DATE DeepMind hasn't made such commitments and doesn't say anything about risk assessment for dangerous capabilities during training. See the Gemini report on their limited \"impact assessments.\""
                },
                {
                  "name": "Meta",
                  "rating": 0,
                  "hovertextFromSection": "No."
                },
                {
                  "name": "OpenAI",
                  "rating": 75,
                  "hovertextFromSection": "OUT OF DATE The Preparedness Framework says \"We will be running these evaluations continually, i.e., as often as needed to catch any non-trivial capability change, including before, during, and after training. This would include whenever there is a >2x effective compute increase or major algorithmic breakthrough.\" But we have no idea how they can run evaluations before training. More importantly, it's not clear whether \"after training\" includes during deployment. Additionally, the Preparedness Framework has not yet been implemented."
                },
                {
                  "name": "xAI",
                  "rating": 0,
                  "hovertextFromSection": ""
                },
                {
                  "name": "Amazon",
                  "rating": 0,
                  "hovertextFromSection": ""
                },
                {
                  "name": "DeepSeek",
                  "rating": 0,
                  "hovertextFromSection": ""
                },
                {
                  "name": "Anthropic",
                  "rating": 100,
                  "hovertextFromSection": "OUT OF DATE Anthropic commits to do risk assessment every 4x increase in effective training compute and every 3 months. The RSP says this commitment applies \"During model training and fine-tuning,\" but senior staff member Zac Hatfield-Dodds told us the commitment applies to deployment too."
                }
              ]
            }
          ]
        },
        {
          "name": "Accountability",
          "weight": 25,
          "criteria": [
            {
              "name": "Verification",
              "weight": 7,
              "hovertext": "Publish updates on risk assessment practices and results, including low-level details, at least quarterly. One-third credit for reporting internally; one-third for also sharing with external safety organizations; one-third for publishing. Multiply by half if updates exclude low-level details.",
              "orgs": [
                {
                  "name": "Microsoft",
                  "rating": 0,
                  "hovertextFromSection": "No."
                },
                {
                  "name": "DeepMind",
                  "rating": 25,
                  "hovertextFromSection": "OUT OF DATE Google publishes an annual \"AI Principles Progress Update,\" which discusses risk management, but it is not really relevant to extreme risks."
                },
                {
                  "name": "Meta",
                  "rating": 0,
                  "hovertextFromSection": "No."
                },
                {
                  "name": "OpenAI",
                  "rating": 50,
                  "hovertextFromSection": "OUT OF DATE Once the Preparedness Framework is implemented, there will be a monthly internal report and a public scorecard with very high-level results."
                },
                {
                  "name": "xAI",
                  "rating": 0,
                  "hovertextFromSection": ""
                },
                {
                  "name": "Amazon",
                  "rating": 0,
                  "hovertextFromSection": ""
                },
                {
                  "name": "DeepSeek",
                  "rating": 0,
                  "hovertextFromSection": ""
                },
                {
                  "name": "Anthropic",
                  "rating": 33,
                  "hovertextFromSection": "OUT OF DATE Just internally. Anthropic says its Responsible Scaling Officer does this. Anthropic also irregularly publishes model cards with high-level discussion of its dangerous-capability risk assessment practices and results."
                }
              ]
            },
            {
              "name": "Revising policies",
              "weight": 7,
              "hovertext": "TODO: description [combines two criteria]",
              "orgs": [
                {
                  "name": "Microsoft",
                  "rating": 0,
                  "hovertextFromSection": "No."
                },
                {
                  "name": "DeepMind",
                  "rating": 0,
                  "hovertextFromSection": "No."
                },
                {
                  "name": "Meta",
                  "rating": 0,
                  "hovertextFromSection": "No."
                },
                {
                  "name": "OpenAI",
                  "rating": 43,
                  "hovertextFromSection": "Avoid bad changes: The Preparedness Framework says the OpenAI board will review changes and have veto power. However, there is no commitment to share changes. Promote good changes: nothing."
                },
                {
                  "name": "xAI",
                  "rating": 0,
                  "hovertextFromSection": ""
                },
                {
                  "name": "Amazon",
                  "rating": 0,
                  "hovertextFromSection": ""
                },
                {
                  "name": "DeepSeek",
                  "rating": 0,
                  "hovertextFromSection": ""
                },
                {
                  "name": "Anthropic",
                  "rating": 61,
                  "hovertextFromSection": "OUT OF DATE Avoid bad changes: Changes to Anthropic's RSP must be approved by the (not independent) board and published before they are implemented. Anthropic's independent Long-Term Benefit Trust is consulted but has no formal power. Promote good changes: Anthropic committed to \"Implement a non-compliance reporting policy.\" Senior staff member Zac Hatfield-Dodds told us \"Beyond standard internal communications channels, our recently formalized non-compliance reporting policy meets these criteria, and will be described in the forthcoming RSP v1.1.\""
                }
              ]
            },
            {
              "name": "External review",
              "weight": 2,
              "hovertext": "Elicit external review of risk assessment practices and commitments. Publish those reviews, with light redaction if necessary.",
              "orgs": [
                {
                  "name": "Microsoft",
                  "rating": 0,
                  "hovertextFromSection": "No."
                },
                {
                  "name": "DeepMind",
                  "rating": 0,
                  "hovertextFromSection": "No."
                },
                {
                  "name": "Meta",
                  "rating": 0,
                  "hovertextFromSection": "No."
                },
                {
                  "name": "OpenAI",
                  "rating": 0,
                  "hovertextFromSection": "No."
                },
                {
                  "name": "xAI",
                  "rating": 0,
                  "hovertextFromSection": ""
                },
                {
                  "name": "Amazon",
                  "rating": 0,
                  "hovertextFromSection": ""
                },
                {
                  "name": "DeepSeek",
                  "rating": 0,
                  "hovertextFromSection": ""
                },
                {
                  "name": "Anthropic",
                  "rating": 0,
                  "hovertextFromSection": "No."
                }
              ]
            }
          ]
        }
      ]
    },
    {
      "name": "Deployment",
      "link": "deployment",
      "weight": 24,
      "description": "Avoid dangers in deployment, and boost safety but avoid boosting dangerous research",
      "hovertext": "Avoid dangers in deployment, and boost safety but avoid boosting dangerous research",
      "orgs": [
        {
          "name": "Microsoft",
          "url": "/microsoft#deployment",
          "hovertextFromSection": "<h3>Releasing models well</h3> <ul> <li>Deploy based on risk assessment results: <i>No.</i></li> <li>Structured access: <i>No, Microsoft is releasing the weights of its Phi-3 models.</i></li> <li>Staged release: <i>No.</i></li> </ul> <h3>Keeping capabilities research private</h3> <ul> <li>Policy against publishing capabilities research: <i>No.</i></li> <li>Keep research behind the lab's language models private: <i>No.</i></li> <li>Keep other capabilities research private: <i>No.</i></li> </ul> <h3>Deployment protocol</h3> <ul> <li>Safety scaffolding: <i>4%. Microsoft uses content filtering but not to avert misuse, and it does not use other safety scaffolding techniques.</i></li> <li>Commit to respond to AI scheming: <i>No.</i></li> </ul> <br> Abridged; see \"Deployment\" for  details."
        },
        {
          "name": "DeepMind",
          "url": "/deepmind#deployment",
          "hovertextFromSection": "<h3>Releasing models well</h3> <ul> <li>Deploy based on risk assessment results: <i>No.</i></li> <li>Structured access: <i>54%. DeepMind deploys its most powerful models via API, but doesn't ____.</i></li> </ul> <h3>Keeping capabilities research private</h3> <ul> <li>Policy against publishing capabilities research: <i>No.</i></li> <li>Keep research behind the lab's language models private: <i>No, DeepMind publishes this research, including on its Gemini models.</i></li> <li>Keep other capabilities research private: <i>No.</i></li> </ul> <h3>Deployment protocol</h3> <ul> <li>Safety scaffolding: <i>0%. DeepMind doesn't use any of these techniques.</i></li> <li>Commit to respond to AI scheming: <i>No.</i></li> </ul> <br> Abridged; see \"Deployment\" for  details."
        },
        {
          "name": "Meta",
          "url": "/meta#deployment",
          "hovertextFromSection": ""
        },
        {
          "name": "OpenAI",
          "url": "/openai#deployment",
          "hovertextFromSection": ""
        },
        {
          "name": "Anthropic",
          "url": "/anthropic#deployment",
          "hovertextFromSection": ""
        }
      ],
      "subcategories": [
        {
          "name": "Deployment decision",
          "weight": 24,
          "criteria": [
            {
              "name": "Criterion",
              "weight": 2,
              "orgs": [
                {
                  "name": "Microsoft",
                  "rating": 10,
                  "hovertextFromSection": "TODO"
                },
                {
                  "name": "DeepMind",
                  "rating": 10,
                  "hovertextFromSection": "TODO"
                },
                {
                  "name": "Meta",
                  "rating": 10,
                  "hovertextFromSection": "TODO"
                },
                {
                  "name": "OpenAI",
                  "rating": 10,
                  "hovertextFromSection": "TODO"
                },
                {
                  "name": "xAI",
                  "rating": 0,
                  "hovertextFromSection": ""
                },
                {
                  "name": "Amazon",
                  "rating": 0,
                  "hovertextFromSection": ""
                },
                {
                  "name": "DeepSeek",
                  "rating": 0,
                  "hovertextFromSection": ""
                },
                {
                  "name": "Anthropic",
                  "rating": 10,
                  "hovertextFromSection": "TODO"
                }
              ]
            },
            {
              "name": "Criterion",
              "weight": 1,
              "orgs": [
                {
                  "name": "Microsoft",
                  "rating": 10,
                  "hovertextFromSection": "TODO"
                },
                {
                  "name": "DeepMind",
                  "rating": 10,
                  "hovertextFromSection": "TODO"
                },
                {
                  "name": "Meta",
                  "rating": 10,
                  "hovertextFromSection": "TODO"
                },
                {
                  "name": "OpenAI",
                  "rating": 10,
                  "hovertextFromSection": "TODO"
                },
                {
                  "name": "xAI",
                  "rating": 0,
                  "hovertextFromSection": ""
                },
                {
                  "name": "Amazon",
                  "rating": 0,
                  "hovertextFromSection": ""
                },
                {
                  "name": "DeepSeek",
                  "rating": 0,
                  "hovertextFromSection": ""
                },
                {
                  "name": "Anthropic",
                  "rating": 10,
                  "hovertextFromSection": "TODO"
                }
              ]
            }
          ]
        },
        {
          "name": "Release method",
          "weight": 22,
          "criteria": [
            {
              "name": "Criterion",
              "weight": 27,
              "orgs": [
                {
                  "name": "Microsoft",
                  "rating": 10,
                  "hovertextFromSection": "TODO"
                },
                {
                  "name": "DeepMind",
                  "rating": 10,
                  "hovertextFromSection": "TODO"
                },
                {
                  "name": "Meta",
                  "rating": 10,
                  "hovertextFromSection": "TODO"
                },
                {
                  "name": "OpenAI",
                  "rating": 10,
                  "hovertextFromSection": "TODO"
                },
                {
                  "name": "xAI",
                  "rating": 0,
                  "hovertextFromSection": ""
                },
                {
                  "name": "Amazon",
                  "rating": 0,
                  "hovertextFromSection": ""
                },
                {
                  "name": "DeepSeek",
                  "rating": 0,
                  "hovertextFromSection": ""
                },
                {
                  "name": "Anthropic",
                  "rating": 10,
                  "hovertextFromSection": "TODO"
                }
              ]
            },
            {
              "name": "Criterion",
              "weight": 22,
              "orgs": [
                {
                  "name": "Microsoft",
                  "rating": 10,
                  "hovertextFromSection": "TODO"
                },
                {
                  "name": "DeepMind",
                  "rating": 10,
                  "hovertextFromSection": "TODO"
                },
                {
                  "name": "Meta",
                  "rating": 10,
                  "hovertextFromSection": "TODO"
                },
                {
                  "name": "OpenAI",
                  "rating": 10,
                  "hovertextFromSection": "TODO"
                },
                {
                  "name": "xAI",
                  "rating": 0,
                  "hovertextFromSection": ""
                },
                {
                  "name": "Amazon",
                  "rating": 0,
                  "hovertextFromSection": ""
                },
                {
                  "name": "DeepSeek",
                  "rating": 0,
                  "hovertextFromSection": ""
                },
                {
                  "name": "Anthropic",
                  "rating": 10,
                  "hovertextFromSection": "TODO"
                }
              ]
            },
            {
              "name": "Criterion",
              "weight": 14,
              "orgs": [
                {
                  "name": "Microsoft",
                  "rating": 10,
                  "hovertextFromSection": "TODO"
                },
                {
                  "name": "DeepMind",
                  "rating": 10,
                  "hovertextFromSection": "TODO"
                },
                {
                  "name": "Meta",
                  "rating": 10,
                  "hovertextFromSection": "TODO"
                },
                {
                  "name": "OpenAI",
                  "rating": 10,
                  "hovertextFromSection": "TODO"
                },
                {
                  "name": "xAI",
                  "rating": 0,
                  "hovertextFromSection": ""
                },
                {
                  "name": "Amazon",
                  "rating": 0,
                  "hovertextFromSection": ""
                },
                {
                  "name": "DeepSeek",
                  "rating": 0,
                  "hovertextFromSection": ""
                },
                {
                  "name": "Anthropic",
                  "rating": 10,
                  "hovertextFromSection": "TODO"
                }
              ]
            },
            {
              "name": "Criterion",
              "weight": 10,
              "orgs": [
                {
                  "name": "Microsoft",
                  "rating": 10,
                  "hovertextFromSection": "TODO"
                },
                {
                  "name": "DeepMind",
                  "rating": 10,
                  "hovertextFromSection": "TODO"
                },
                {
                  "name": "Meta",
                  "rating": 10,
                  "hovertextFromSection": "TODO"
                },
                {
                  "name": "OpenAI",
                  "rating": 10,
                  "hovertextFromSection": "TODO"
                },
                {
                  "name": "xAI",
                  "rating": 0,
                  "hovertextFromSection": ""
                },
                {
                  "name": "Amazon",
                  "rating": 0,
                  "hovertextFromSection": ""
                },
                {
                  "name": "DeepSeek",
                  "rating": 0,
                  "hovertextFromSection": ""
                },
                {
                  "name": "Anthropic",
                  "rating": 10,
                  "hovertextFromSection": "TODO"
                }
              ]
            }
          ]
        },
        {
          "name": "Safety scaffolding",
          "weight": 23,
          "criteria": [
            {
              "name": "[Filter]",
              "weight": 3,
              "orgs": [
                {
                  "name": "Microsoft",
                  "rating": 10,
                  "hovertextFromSection": "TODO"
                },
                {
                  "name": "DeepMind",
                  "rating": 10,
                  "hovertextFromSection": "TODO"
                },
                {
                  "name": "Meta",
                  "rating": 10,
                  "hovertextFromSection": "TODO"
                },
                {
                  "name": "OpenAI",
                  "rating": 10,
                  "hovertextFromSection": "TODO"
                },
                {
                  "name": "xAI",
                  "rating": 0,
                  "hovertextFromSection": ""
                },
                {
                  "name": "Amazon",
                  "rating": 0,
                  "hovertextFromSection": ""
                },
                {
                  "name": "DeepSeek",
                  "rating": 0,
                  "hovertextFromSection": ""
                },
                {
                  "name": "Anthropic",
                  "rating": 10,
                  "hovertextFromSection": "TODO"
                }
              ]
            },
            {
              "name": "LM monitors",
              "weight": 6,
              "orgs": [
                {
                  "name": "Microsoft",
                  "rating": 10,
                  "hovertextFromSection": "TODO"
                },
                {
                  "name": "DeepMind",
                  "rating": 10,
                  "hovertextFromSection": "TODO"
                },
                {
                  "name": "Meta",
                  "rating": 10,
                  "hovertextFromSection": "TODO"
                },
                {
                  "name": "OpenAI",
                  "rating": 10,
                  "hovertextFromSection": "TODO"
                },
                {
                  "name": "xAI",
                  "rating": 0,
                  "hovertextFromSection": ""
                },
                {
                  "name": "Amazon",
                  "rating": 0,
                  "hovertextFromSection": ""
                },
                {
                  "name": "DeepSeek",
                  "rating": 0,
                  "hovertextFromSection": ""
                },
                {
                  "name": "Anthropic",
                  "rating": 10,
                  "hovertextFromSection": "TODO"
                }
              ]
            },
            {
              "name": "Coup probes",
              "weight": 2,
              "orgs": [
                {
                  "name": "Microsoft",
                  "rating": 10,
                  "hovertextFromSection": "TODO"
                },
                {
                  "name": "DeepMind",
                  "rating": 10,
                  "hovertextFromSection": "TODO"
                },
                {
                  "name": "Meta",
                  "rating": 10,
                  "hovertextFromSection": "TODO"
                },
                {
                  "name": "OpenAI",
                  "rating": 10,
                  "hovertextFromSection": "TODO"
                },
                {
                  "name": "xAI",
                  "rating": 0,
                  "hovertextFromSection": ""
                },
                {
                  "name": "Amazon",
                  "rating": 0,
                  "hovertextFromSection": ""
                },
                {
                  "name": "DeepSeek",
                  "rating": 0,
                  "hovertextFromSection": ""
                },
                {
                  "name": "Anthropic",
                  "rating": 10,
                  "hovertextFromSection": "TODO"
                }
              ]
            },
            {
              "name": "Redaction/paraphrasing",
              "weight": 3,
              "orgs": [
                {
                  "name": "Microsoft",
                  "rating": 10,
                  "hovertextFromSection": "TODO"
                },
                {
                  "name": "DeepMind",
                  "rating": 10,
                  "hovertextFromSection": "TODO"
                },
                {
                  "name": "Meta",
                  "rating": 10,
                  "hovertextFromSection": "TODO"
                },
                {
                  "name": "OpenAI",
                  "rating": 10,
                  "hovertextFromSection": "TODO"
                },
                {
                  "name": "xAI",
                  "rating": 0,
                  "hovertextFromSection": ""
                },
                {
                  "name": "Amazon",
                  "rating": 0,
                  "hovertextFromSection": ""
                },
                {
                  "name": "DeepSeek",
                  "rating": 0,
                  "hovertextFromSection": ""
                },
                {
                  "name": "Anthropic",
                  "rating": 10,
                  "hovertextFromSection": "TODO"
                }
              ]
            },
            {
              "name": "Commitments",
              "weight": 3,
              "orgs": [
                {
                  "name": "Microsoft",
                  "rating": 10,
                  "hovertextFromSection": "TODO"
                },
                {
                  "name": "DeepMind",
                  "rating": 10,
                  "hovertextFromSection": "TODO"
                },
                {
                  "name": "Meta",
                  "rating": 10,
                  "hovertextFromSection": "TODO"
                },
                {
                  "name": "OpenAI",
                  "rating": 10,
                  "hovertextFromSection": "TODO"
                },
                {
                  "name": "xAI",
                  "rating": 0,
                  "hovertextFromSection": ""
                },
                {
                  "name": "Amazon",
                  "rating": 0,
                  "hovertextFromSection": ""
                },
                {
                  "name": "DeepSeek",
                  "rating": 0,
                  "hovertextFromSection": ""
                },
                {
                  "name": "Anthropic",
                  "rating": 10,
                  "hovertextFromSection": "TODO"
                }
              ]
            },
            {
              "name": "Describe the protocol",
              "weight": 2,
              "orgs": [
                {
                  "name": "Microsoft",
                  "rating": 10,
                  "hovertextFromSection": "TODO"
                },
                {
                  "name": "DeepMind",
                  "rating": 10,
                  "hovertextFromSection": "TODO"
                },
                {
                  "name": "Meta",
                  "rating": 10,
                  "hovertextFromSection": "TODO"
                },
                {
                  "name": "OpenAI",
                  "rating": 10,
                  "hovertextFromSection": "TODO"
                },
                {
                  "name": "xAI",
                  "rating": 0,
                  "hovertextFromSection": ""
                },
                {
                  "name": "Amazon",
                  "rating": 0,
                  "hovertextFromSection": ""
                },
                {
                  "name": "DeepSeek",
                  "rating": 0,
                  "hovertextFromSection": ""
                },
                {
                  "name": "Anthropic",
                  "rating": 10,
                  "hovertextFromSection": "TODO"
                }
              ]
            }
          ]
        }
      ],
      "criteria": [
        {
          "name": "Adversarial robustness",
          "weight": 5,
          "hovertext": "TODO",
          "orgs": [
            {
              "name": "Microsoft",
              "rating": 10,
              "hovertextFromSection": "TODO"
            },
            {
              "name": "DeepMind",
              "rating": 10,
              "hovertextFromSection": "TODO"
            },
            {
              "name": "Meta",
              "rating": 10,
              "hovertextFromSection": "TODO"
            },
            {
              "name": "OpenAI",
              "rating": 10,
              "hovertextFromSection": "TODO"
            },
            {
              "name": "xAI",
              "rating": 0,
              "hovertextFromSection": ""
            },
            {
              "name": "Amazon",
              "rating": 0,
              "hovertextFromSection": ""
            },
            {
              "name": "DeepSeek",
              "rating": 0,
              "hovertextFromSection": ""
            },
            {
              "name": "Anthropic",
              "rating": 10,
              "hovertextFromSection": "TODO"
            }
          ]
        },
        {
          "name": "Other",
          "weight": 2,
          "hovertext": "TODO",
          "orgs": [
            {
              "name": "Microsoft",
              "rating": 10,
              "hovertextFromSection": "TODO"
            },
            {
              "name": "DeepMind",
              "rating": 10,
              "hovertextFromSection": "TODO"
            },
            {
              "name": "Meta",
              "rating": 10,
              "hovertextFromSection": "TODO"
            },
            {
              "name": "OpenAI",
              "rating": 10,
              "hovertextFromSection": "TODO"
            },
            {
              "name": "xAI",
              "rating": 0,
              "hovertextFromSection": ""
            },
            {
              "name": "Amazon",
              "rating": 0,
              "hovertextFromSection": ""
            },
            {
              "name": "DeepSeek",
              "rating": 0,
              "hovertextFromSection": ""
            },
            {
              "name": "Anthropic",
              "rating": 10,
              "hovertextFromSection": "TODO"
            }
          ]
        }
      ]
    },
    {
      "name": "Prepare for extreme security",
      "link": "security",
      "weight": 9,
      "description": "Prevent model weights and research from being stolen",
      "hovertext": "Prevent model weights and research from being stolen",
      "orgs": [
        {
          "name": "Microsoft",
          "url": "/microsoft#security"
        },
        {
          "name": "DeepMind",
          "url": "/deepmind#security"
        },
        {
          "name": "Meta",
          "url": "/meta#security"
        },
        {
          "name": "OpenAI",
          "url": "/openai#security"
        },
        {
          "name": "Anthropic",
          "url": "/anthropic#security"
        }
      ],
      "subcategories": [
        {
          "name": "Best practices",
          "weight": 10,
          "criteria": [
            {
              "name": "Code in cloud",
              "weight": 2,
              "hovertext": "Keep source code exclusively in a hardened cloud environment, not on endpoints.",
              "orgs": [
                {
                  "name": "Microsoft",
                  "rating": 0,
                  "hovertextFromSection": "TODO"
                },
                {
                  "name": "DeepMind",
                  "rating": 0,
                  "hovertextFromSection": "TODO"
                },
                {
                  "name": "Meta",
                  "rating": 0,
                  "hovertextFromSection": "TODO"
                },
                {
                  "name": "OpenAI",
                  "rating": 0,
                  "hovertextFromSection": "TODO"
                },
                {
                  "name": "xAI",
                  "rating": 0,
                  "hovertextFromSection": ""
                },
                {
                  "name": "Amazon",
                  "rating": 0,
                  "hovertextFromSection": ""
                },
                {
                  "name": "DeepSeek",
                  "rating": 0,
                  "hovertextFromSection": ""
                },
                {
                  "name": "Anthropic",
                  "rating": 0,
                  "hovertextFromSection": "TODO"
                }
              ]
            },
            {
              "name": "Multiparty access controls",
              "weight": 2,
              "hovertext": "Use multiparty access controls for model weights and some code.",
              "orgs": [
                {
                  "name": "Microsoft",
                  "rating": 0,
                  "hovertextFromSection": "TODO"
                },
                {
                  "name": "DeepMind",
                  "rating": 0,
                  "hovertextFromSection": "TODO"
                },
                {
                  "name": "Meta",
                  "rating": 0,
                  "hovertextFromSection": "TODO"
                },
                {
                  "name": "OpenAI",
                  "rating": 0,
                  "hovertextFromSection": "TODO"
                },
                {
                  "name": "xAI",
                  "rating": 0,
                  "hovertextFromSection": ""
                },
                {
                  "name": "Amazon",
                  "rating": 0,
                  "hovertextFromSection": ""
                },
                {
                  "name": "DeepSeek",
                  "rating": 0,
                  "hovertextFromSection": ""
                },
                {
                  "name": "Anthropic",
                  "rating": 50,
                  "hovertextFromSection": "Anthropic says it is implementing this."
                }
              ]
            },
            {
              "name": "Upload limits",
              "weight": 1,
              "hovertext": "Limit (e.g. by volume) uploads from clusters with model weights.",
              "orgs": [
                {
                  "name": "Microsoft",
                  "rating": 0,
                  "hovertextFromSection": "TODO"
                },
                {
                  "name": "DeepMind",
                  "rating": 0,
                  "hovertextFromSection": "TODO"
                },
                {
                  "name": "Meta",
                  "rating": 0,
                  "hovertextFromSection": "TODO"
                },
                {
                  "name": "OpenAI",
                  "rating": 0,
                  "hovertextFromSection": "TODO"
                },
                {
                  "name": "xAI",
                  "rating": 0,
                  "hovertextFromSection": ""
                },
                {
                  "name": "Amazon",
                  "rating": 0,
                  "hovertextFromSection": ""
                },
                {
                  "name": "DeepSeek",
                  "rating": 0,
                  "hovertextFromSection": ""
                },
                {
                  "name": "Anthropic",
                  "rating": 0,
                  "hovertextFromSection": "TODO"
                }
              ]
            }
          ]
        }
      ],
      "criteria": [
        {
          "name": "Plan for SL5",
          "weight": 6,
          "hovertext": "Establish and publish a breach disclosure policy, ideally including incident or near-miss reporting. Also report all breaches since 1/1/2022 (and say the lab has done so). Also have few serious breaches and near misses (evaluated holistically).",
          "orgs": [
            {
            "name": "Microsoft",
            "rating": 0,
            "hovertextFromSection": "No breach disclosure policy."
            },
            {
            "name": "DeepMind",
            "rating": 0,
            "hovertextFromSection": "No breach disclosure policy."
            },
            {
            "name": "Meta",
            "rating": 0,
            "hovertextFromSection": "No breach disclosure policy."
            },
            {
            "name": "OpenAI",
            "rating": 0,
            "hovertextFromSection": "No breach disclosure policy."
            },
            {
           "name": "xAI",
            "rating": 0,
            "hovertextFromSection": ""
            },
            {
            "name": "Amazon",
            "rating": 0,
            "hovertextFromSection": ""
            },
            {
            "name": "DeepSeek",
            "rating": 0,
            "hovertextFromSection": ""
            },
            {
            "name": "Anthropic",
            "rating": 0,
            "hovertextFromSection": "No breach disclosure policy."
            }
          ]
        },
        {
          "name": "Track record",
          "weight": 6,
          "hovertext": "Establish and publish a breach disclosure policy, ideally including incident or near-miss reporting. Also report all breaches since 1/1/2022 (and say the lab has done so). Also have few serious breaches and near misses (evaluated holistically).",
          "orgs": [
            {
              "name": "Microsoft",
              "rating": 0,
              "hovertextFromSection": "No breach disclosure policy."
            },
            {
              "name": "DeepMind",
              "rating": 0,
              "hovertextFromSection": "No breach disclosure policy."
            },
            {
              "name": "Meta",
              "rating": 0,
              "hovertextFromSection": "No breach disclosure policy."
            },
            {
              "name": "OpenAI",
              "rating": 0,
              "hovertextFromSection": "No breach disclosure policy."
            },
            {
              "name": "xAI",
              "rating": 0,
              "hovertextFromSection": ""
            },
            {
              "name": "Amazon",
              "rating": 0,
              "hovertextFromSection": ""
            },
            {
              "name": "DeepSeek",
              "rating": 0,
              "hovertextFromSection": ""
            },
            {
              "name": "Anthropic",
              "rating": 0,
              "hovertextFromSection": "No breach disclosure policy."
            }
          ]
        },
        {
          "name": "Certification/audit/pentest stuff",
          "weight": 4,
          "hovertext": "Commit to achieve specific security levels (as measured by audits or security-techniques-implemented) before creating models beyond corresponding risk thresholds (especially as measured by model evals for dangerous capabilities).",
          "orgs": [
            {
              "name": "Microsoft",
              "rating": 0,
              "hovertextFromSection": "No."
            },
            {
              "name": "DeepMind",
              "rating": 0,
              "hovertextFromSection": "No."
            },
            {
              "name": "Meta",
              "rating": 0,
              "hovertextFromSection": "No."
            },
            {
              "name": "OpenAI",
              "rating": 25,
              "hovertextFromSection": "OpenAI's beta Preparedness Framework mentions improving security before reaching \"high\"-level risk, but it is not specific."
            },
            {
              "name": "xAI",
              "rating": 0,
              "hovertextFromSection": ""
            },
            {
              "name": "Amazon",
              "rating": 0,
              "hovertextFromSection": ""
            },
            {
              "name": "DeepSeek",
              "rating": 0,
              "hovertextFromSection": ""
            },
            {
              "name": "Anthropic",
              "rating": 75,
              "hovertextFromSection": "Anthropic's Responsible Scaling Policy has security commitments, but they are insufficient."
            }
          ]
        }
      ]
    },
    {
      "name": "Internal governance",
      "link": "governance",
      "weight": 8,
      "description": "Have internal structure and processes to promote safety and help make important decisions well",
      "hovertext": "Have internal structure and processes to promote safety and help make important decisions well",
      "orgs": [
        {
          "name": "Microsoft",
          "url": "/microsoft#internal-governance"
        },
        {
          "name": "DeepMind",
          "url": "/deepmind#internal-governance"
        },
        {
          "name": "Meta",
          "url": "/meta#internal-governance"
        },
        {
          "name": "OpenAI",
          "url": "/openai#internal-governance"
        },
        {
          "name": "Anthropic",
          "url": "/anthropic#internal-governance"
        }
      ],
      "subcategories": [
        {
          "name": "Organizational structure",
          "weight": 34,
          "criteria": [
            {
              "name": "[Safety mandate]",
              "weight": 1,
              "hovertext": "TODO",
              "orgs": [
                {
                  "name": "Microsoft",
                  "rating": 0
                },
                {
                  "name": "DeepMind",
                  "rating": 0
                },
                {
                  "name": "Meta",
                  "rating": 0
                },
                {
                  "name": "OpenAI",
                  "rating": 100,
                  "hovertextFromSection": "OpenAI is a capped profit company controlled by a nonprofit. OpenAI's \"mission is to ensure that artificial general intelligence benefits all of humanity,\" and its Charter mentions \"Broadly distributed benefits\" and \"Long-term safety.\""
                },
                {
                  "name": "xAI",
                  "rating": 0,
                  "hovertextFromSection": ""
                },
                {
                  "name": "Amazon",
                  "rating": 0,
                  "hovertextFromSection": ""
                },
                {
                  "name": "DeepSeek",
                  "rating": 0,
                  "hovertextFromSection": ""
                },
                {
                  "name": "Anthropic",
                  "rating": 100,
                  "hovertextFromSection": "Anthropic is a public-benefit corporation. Its mission is to \"responsibly develop and maintain advanced AI for the long-term benefit of humanity.\" Its Long-Term Benefit Trust has the same mandate."
                }
              ]
            },
            {
              "name": "[Good board]",
              "weight": 1,
              "hovertext": "TODO",
              "orgs": [
                {
                  "name": "Microsoft",
                  "rating": 0,
                  "hovertextFromSection": "There is not a board with a mandate for safety and benefit-sharing."
                },
                {
                  "name": "DeepMind",
                  "rating": 0,
                  "hovertextFromSection": "There is not a board with a mandate for safety and benefit-sharing."
                },
                {
                  "name": "Meta",
                  "rating": 0,
                  "hovertextFromSection": "There is not a board with a mandate for safety and benefit-sharing."
                },
                {
                  "name": "OpenAI",
                  "rating": 68,
                  "hovertextFromSection": "OpenAI is controlled by a nonprofit board. Its \"mission is to ensure that artificial general intelligence benefits all of humanity,\" and the Charter mentions \"Broadly distributed benefits\" and \"Long-term safety.\" Six of the seven board members are independent, but CEO Sam Altman is on the board. It is not clear whether the board is well-informed and actually provides effective oversight. The Preparedness Framework says the board will be informed and has some ability to overrule leadership. Altman has tried to limit the board's insight into the company; he once told an independent board member to tell him if she spoke to employees."
                },
                {
                  "name": "xAI",
                  "rating": 0,
                  "hovertextFromSection": ""
                },
                {
                  "name": "Amazon",
                  "rating": 0,
                  "hovertextFromSection": ""
                },
                {
                  "name": "DeepSeek",
                  "rating": 0,
                  "hovertextFromSection": ""
                },
                {
                  "name": "Anthropic",
                  "rating": 35,
                  "hovertextFromSection": "TODO: Anthropic board (https://ailabwatch.org/companies/anthropic/#evaluation-6)"
                }
              ]
            }
          ]
        }
      ],
      "criteria": [
        {
          "name": "Internal reporting mechanism",
          "weight": 33,
          "hovertext": "Todo",
          "orgs": [
            {
              "name": "Microsoft",
              "rating": 0,
              "hovertextFromSection": ""
            },
            {
              "name": "DeepMind",
              "rating": 0,
              "hovertextFromSection": ""
            },
            {
              "name": "Meta",
              "rating": 0,
              "hovertextFromSection": ""
            },
            {
              "name": "OpenAI",
              "rating": 25,
              "hovertextFromSection": ""
            },
            {
              "name": "xAI",
              "rating": 0,
              "hovertextFromSection": ""
            },
            {
              "name": "Amazon",
              "rating": 0,
              "hovertextFromSection": ""
            },
            {
              "name": "DeepSeek",
              "rating": 0,
              "hovertextFromSection": ""
            },
            {
              "name": "Anthropic",
              "rating": 0,
              "hovertextFromSection": ""
            }
          ]
        },
        {
          "name": "Whistleblowing mechanism",
          "weight": 33,
          "hovertext": "Todo",
          "orgs": [
            {
              "name": "Microsoft",
              "rating": 0,
              "hovertextFromSection": ""
            },
            {
              "name": "DeepMind",
              "rating": 0,
              "hovertextFromSection": ""
            },
            {
              "name": "Meta",
              "rating": 0,
              "hovertextFromSection": ""
            },
            {
              "name": "OpenAI",
              "rating": 25,
              "hovertextFromSection": ""
            },
            {
              "name": "xAI",
              "rating": 0,
              "hovertextFromSection": ""
            },
            {
              "name": "Amazon",
              "rating": 0,
              "hovertextFromSection": ""
            },
            {
              "name": "DeepSeek",
              "rating": 0,
              "hovertextFromSection": ""
            },
            {
              "name": "Anthropic",
              "rating": 25,
              "hovertextFromSection": ""
            }
          ]
        }
      ]
    },
    {
      "name": "Publish safety research",
      "link": "safety-research",
      "weight": 6,
      "description": "Perform and share alignment research at all; have an alignment research team",
      "hovertext": "Perform and share alignment research at all; have an alignment research team",
      "orgs": [
        {
          "name": "Microsoft",
          "url": "/microsoft#alignment-program"
        },
        {
          "name": "DeepMind",
          "url": "/deepmind#alignment-program"
        },
        {
          "name": "Meta",
          "url": "/meta#alignment-program"
        },
        {
          "name": "OpenAI",
          "url": "/openai#alignment-program"
        },
        {
          "name": "Anthropic",
          "url": "/anthropic#alignment-program"
        }
      ],
      "criteria": [
        {
          "name": "Alignment program existence",
          "weight": 100,
          "hovertext": "Have an alignment research team and publish some alignment research. (This is crude; legibly measuring the value of alignment research is hard.)",
          "orgs": [
            {
              "name": "Microsoft",
              "rating": 0,
              "hovertextFromSection": "Microsoft does not do alignment research."
            },
            {
              "name": "DeepMind",
              "rating": 100,
              "hovertextFromSection": "DeepMind publishes substantial real alignment research. See \"Some high-level thoughts on the DeepMind alignment team's strategy.\" More recently, they published details of their model evals for dangerous capabilities."
            },
            {
              "name": "Meta",
              "rating": 0,
              "hovertextFromSection": "Meta AI does not do alignment research."
            },
            {
              "name": "OpenAI",
              "rating": 100,
              "hovertextFromSection": "OpenAI publishes substantial real alignment research."
            },
            {
              "name": "xAI",
              "rating": 0,
              "hovertextFromSection": ""
            },
            {
              "name": "Amazon",
              "rating": 0,
              "hovertextFromSection": ""
            },
            {
              "name": "DeepSeek",
              "rating": 0,
              "hovertextFromSection": ""
            },
            {
              "name": "Anthropic",
              "rating": 100,
              "hovertextFromSection": "Anthropic publishes substantial real alignment research."
            }
          ]
        }
      ]
    },
    {
      "name": "Planning",
      "link": "planning",
      "weight": 6,
      "description": "Make a plan for aligning powerful systems the lab creates",
      "hovertext": "Make a plan for aligning powerful systems the lab creates",
      "orgs": [
        {
          "name": "Microsoft",
          "url": "/microsoft#alignment-plan"
        },
        {
          "name": "DeepMind",
          "url": "/deepmind#alignment-plan"
        },
        {
          "name": "Meta",
          "url": "/meta#alignment-plan"
        },
        {
          "name": "OpenAI",
          "url": "/openai#alignment-plan"
        },
        {
          "name": "Anthropic",
          "url": "/anthropic#alignment-plan"
        }
      ],
      "criteria": [
        {
          "name": "Safety plan",
          "weight": 1,
          "hovertext": "Todo",
          "orgs": [
            {
              "name": "Microsoft",
              "rating": 0
            },
            {
              "name": "DeepMind",
              "rating": 25,
              "hovertextFromSection": "Todo"
            },
            {
              "name": "Meta",
              "rating": 0
            },
            {
              "name": "OpenAI",
              "rating": 10,
              "hovertextFromSection": "Todo"
            },
            {
              "name": "xAI",
              "rating": 0,
              "hovertextFromSection": ""
            },
            {
              "name": "Amazon",
              "rating": 0,
              "hovertextFromSection": ""
            },
            {
              "name": "DeepSeek",
              "rating": 0,
              "hovertextFromSection": ""
            },
            {
              "name": "Anthropic",
              "rating": 25,
              "hovertextFromSection": "Anthropic has shared how it thinks about alignment and its portfolio approach in \"Core Views on AI Safety.\""
            }
          ]
        },
        {
          "name": "Plan for how to use AGI",
          "weight": 1,
          "hovertext": "Todo: clarify what I want",
          "orgs": [
            {
              "name": "Microsoft",
              "rating": 0
            },
            {
              "name": "DeepMind",
              "rating": 0
            },
            {
              "name": "Meta",
              "rating": 0
            },
            {
              "name": "OpenAI",
              "rating": 0
            },
            {
              "name": "xAI",
              "rating": 0,
              "hovertextFromSection": ""
            },
            {
              "name": "Amazon",
              "rating": 0,
              "hovertextFromSection": ""
            },
            {
              "name": "DeepSeek",
              "rating": 0,
              "hovertextFromSection": ""
            },
            {
              "name": "Anthropic",
              "rating": 0
            }
          ]
        },
        {
          "name": "Prepare for a pause",
          "weight": 1,
          "hovertext": "Todo: clarify what I want",
          "orgs": [
            {
              "name": "Microsoft",
              "rating": 0,
              "hovertextFromSection": "No."
            },
            {
              "name": "DeepMind",
              "rating": 0,
              "hovertextFromSection": "No."
            },
            {
              "name": "Meta",
              "rating": 0,
              "hovertextFromSection": "No."
            },
            {
              "name": "OpenAI",
              "rating": 0,
              "hovertextFromSection": "OpenAI's Preparedness Framework says \"we recognize that pausing deployment or development would be the last resort (but potentially necessary) option.\" OpenAI has not elaborated on what a pause would entail."
            },
            {
              "name": "xAI",
              "rating": 0,
              "hovertextFromSection": ""
            },
            {
              "name": "Amazon",
              "rating": 0,
              "hovertextFromSection": ""
            },
            {
              "name": "DeepSeek",
              "rating": 0,
              "hovertextFromSection": ""
            },
            {
              "name": "Anthropic",
              "rating": 50,
              "hovertextFromSection": "Anthropic commits to be financially prepared for a pause for safety, but it has not said what its capabilities researchers would work on during a pause."
            }
          ]
        }
      ]
    },
    {
      "name": "Public statements",
      "link": "public-statements",
      "weight": 3,
      "description": "Be aware of AI risk, that AI safety might be really hard, and that risks might be hard to notice",
      "hovertext": "Be aware of AI risk, that AI safety might be really hard, and that risks might be hard to notice",
      "orgs": [
        {
          "name": "Microsoft",
          "url": "/microsoft#public-statements"
        },
        {
          "name": "DeepMind",
          "url": "/deepmind#public-statements"
        },
        {
          "name": "Meta",
          "url": "/meta#public-statements"
        },
        {
          "name": "OpenAI",
          "url": "/openai#public-statements"
        },
        {
          "name": "Anthropic",
          "url": "/anthropic#public-statements"
        }
      ],
      "criteria": [
        {
          "name": "Talk about extreme risks",
          "weight": 80,
          "hovertext": "(1/4) The lab and its leadership understand extreme misuse or structural risks. <br> (1/4) … and they understand misalignment, that AI safety might be really hard, that risks might be hard to notice, that powerful capabilities might appear suddenly, and why they might need an alignment plan, and they talk about all this. <br> (1/4) … and they talk about it often/consistently. <br> (1/4) … and they consistently emphasize extreme risks.",
          "orgs": [
            {
              "name": "Microsoft",
              "rating": 0,
              "hovertextFromSection": "Microsoft and its leadership don't seem to understand extreme misuse or structural risks, much less misalignment, that AI safety might be really hard, and that risks might be hard to notice."
            },
            {
              "name": "DeepMind",
              "rating": 25,
              "hovertextFromSection": "DeepMind and its leadership sometimes talk about extreme risks, including from misalignment. But they don't do so often or talk about details."
            },
            {
              "name": "Meta",
              "rating": 0,
              "hovertextFromSection": "Meta AI and its leadership don't seem to understand extreme misuse or structural risks, much less misalignment, that AI safety might be really hard, and that risks might be hard to notice."
            },
            {
              "name": "OpenAI",
              "rating": 50,
              "hovertextFromSection": "TODO"
            },
            {
              "name": "xAI",
              "rating": 0,
              "hovertextFromSection": ""
            },
            {
              "name": "Amazon",
              "rating": 0,
              "hovertextFromSection": ""
            },
            {
              "name": "DeepSeek",
              "rating": 0,
              "hovertextFromSection": ""
            },
            {
              "name": "Anthropic",
              "rating": 75,
              "hovertextFromSection": "TODO"
            }
          ]
        },
        {
          "name": "Describe worst-case outcome",
          "weight": 20,
          "hovertext": "Clearly describe a worst-case plausible outcome from AI and state the lab's credence in such an outcome. Use specific numbers; clarify terms like \"catastrophe\" and \"extreme.\" This statement should be on the lab's website, not just spoken by a leader in an interview. (It should not be contradicted by other things said by the lab and its leadership.)",
          "orgs": [
            {
              "name": "Microsoft",
              "rating": 0
            },
            {
              "name": "DeepMind",
              "rating": 0
            },
            {
              "name": "Meta",
              "rating": 0
            },
            {
              "name": "OpenAI",
              "rating": 0
            },
            {
              "name": "xAI",
              "rating": 0,
              "hovertextFromSection": ""
            },
            {
              "name": "Amazon",
              "rating": 0,
              "hovertextFromSection": ""
            },
            {
              "name": "DeepSeek",
              "rating": 0,
              "hovertextFromSection": ""
            },
            {
              "name": "Anthropic",
              "rating": 0
            }
          ]
        }
      ]
    }
  ]
}

export const posts = [
  {
    "date": "04 November 2024",
    "title": "The current state of RSPs",
    "subtitle": "",
    // text: ""
    "text": `<p>The idea of responsible scaling policies is now over a year old. Anthropic, OpenAI, and DeepMind each have something like an RSP, and several other relevant companies have committed to publish RSPs by February.</p>
<p>The core of an RSP is a risk assessment plan plus a plan for safety practices as a function of risk assessment results. RSPs are appealing because safety practices should be a function of warning signs, and people who disagree about when warning signs are likely to appear may still be able to agree on appropriate responses to particular warning signs. And preparing to notice warning signs, and planning responses, is good to do in advance.</p>`
  },
  {
    "date": "21 October 2024",
    "title": "What AI companies should do",
    "subtitle": "Some rough ideas",
    // text: ""
    "text": `<p>This post is incomplete. I’m publishing it because it might be helpful for some readers anyway. A good version of this post would be more detailed: for each proposed action, explain motivation and high-level goal, explain problem to solve, respond to obvious questions/objections, and lay out costs involved and costs worth accepting.</p>
<p>These are the actions I think companies that will build very powerful AI systems should prioritize to improve safety. I think something like these actions are cost-effective,[1] but specific details may be suboptimal. And some actions are not fully specified; some are of the form do good things in area X or avoid risk Y, without pinning down what to do. And this is not certain to be correct in the future; I just think it’s a good plan for now. Some of these actions are costly, but I claim that they are cheap and important enough that a responsible frontier AI company should do them unilaterally — the gain in safety is worth the cost in competitiveness. I mostly don’t justify these actions in this post.</p>`
  },
  {
    "date": "15 October 2024",
    "title": "Anthropic rewrote its RSP",
    "subtitle": "Some reactions"
  },
  {
    "date": "23 September 2024",
    "title": "Model evals for dangerous capabilities",
    "subtitle": "Testing an LM system for dangerous capabilities is crucial for assessing its risks"
  },
  {
    "date": "27 July 2024",
    "title": "Safety consultations for AI lab employees",
    "subtitle": ""
  },
  {
    "date": "10 July 2024",
    "title": "New page: Integrity",
    "subtitle": "And new-ish page: Policy advocacy"
  },
  {
    "date": "12 June 2024",
    "title": "Anthropic's Certificate of Incorporation",
    "subtitle": "New details on the Long-Term Benefit Trust, but most questions remain"
  },
  {
    "date": "29 May 2024",
    "title": "AI companies' commitments",
    "subtitle": ""
  },
  {
    "date": "27 May 2024",
    "title": "Maybe Anthropic's Long-Term Benefit Trust is powerless",
    "subtitle": "Anthropic should share the details"
  },
  {
    "date": "24 May 2024",
    "title": "AI companies aren't really using external evaluators",
    "subtitle": "But they should"
  },
  {
    "date": "21 May 2024",
    "title": "New voluntary commitments (AI Seoul Summit)",
    "subtitle": "16 companies commit to make RSPs"
  },
  {
    "date": "17 May 2024",
    "title": "DeepMind's \"Frontier Safety Framework\" is weak and unambitious",
    "subtitle": "But they are doing model evals for dangerous capabilities"
  }
]